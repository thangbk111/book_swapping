$(document).ready(function() {
    $.ajaxSetup({
        headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        'accepts': 'application/json',
        }
    });

    var imageList = [];
    if (window.File && window.FileList && window.FileReader) {
        $("#files").on("change", function(e) {
            var date = new Date();
            var prefixName = date.getTime();
            var files = e.target.files,
            filesLength = files.length;
            var name = [];
            //send image to server
            var tmpName = [];
            for (i = 0; i < filesLength; i++) {
              tmpName.push(prefixName + files[i].name);
            }
            data = new FormData($('#form_add_book')[0]);
            data.append('image_name', tmpName);
            $.ajax({
              url: "/upload-images",
              type: "post",
              processData: false,
              contentType: false,
              data: data,

              success: function (data) {
                console.log(data);
              }
            });

            $.each(files, function(index, file ) {
                fileName = prefixName + file.name;
                name.push(fileName);
                imageList.push(fileName);
                var f = file;
                var fileReader = new FileReader();
                fileReader.onload = (function(e) {
                  console.log(index);
                  var file = e.target;
                  $("<span class=\"pip\">" +
                    "<img class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + name[index] + "\"/>" +
                    "<br/><span class=\"remove\">Remove image</span>" +
                    "</span>").appendTo("#show_image_list");
                  $(".remove").click(function(){
                    removeTitle = $(this).parent().find('img').attr('title');
                    var removeIndex = imageList.indexOf(removeTitle);
                    if (removeIndex !== -1) {
                      //remove image on server
                      $.ajax({
                        url: "/delete-image/" + imageList[removeIndex],
                        type: "post",
                        success: function (data) {
                          console.log(data);
                        }
                      });
                      imageList.splice(removeIndex, 1);
                    }
                    $(this).parent(".pip").remove();
                    console.log(imageList);
                  });
                });
                fileReader.readAsDataURL(f);
            });

        });
    } else {
        alert("Your browser doesn't support to File API")
    }

    $('select[name="city_id"]').change(function() {
        var city_id = $(this).val();
        $.ajax({
            url: '/admin/city/'+ city_id + '/get_all_district',
            type: 'post',
            data: { city: city_id, test: 'test'},
            success: function (data) {
                var districts = JSON.parse(data);
                show_districts = '';
                for (var i = 0; i < districts.length; i++) {
                    show_districts += "<option>" + districts[i] + "</option>";
                }
                $('select[name="district_id"]').empty();
                $('select[name="district_id"]').append(show_districts);
            },
            error: function () {
                $('select[name="district_id"]').empty();
                $('select[name="district_id"]').append('<option>---</option>');
            }
        });
    });

    var countries = ["Afghanistan", "Albania", "Bahamas", "Bahrain", "Cambodia", "Cameroon", "Denmark", "Djibouti", "East Timor", "Ecuador", "Falkland Islands (Malvinas)", "Faroe Islands", "Gabon", "Gambia", "Haiti", "Heard and Mc Donald Islands", "Iceland", "India", "Jamaica", "Japan", "Kenya", "Kiribati", "Lao People's Democratic Republic", "Latvia", "Macau", "Macedonia", "Namibia", "Nauru", "Oman", "Pakistan", "Palau", "Qatar", "Reunion", "Romania", "Saint Kitts and Nevis", "Saint Lucia", "Taiwan", "Tajikistan", "Uganda", "Ukraine", "Vanuatu", "Vatican City State", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zaire", "Zambia"];
    
    var countries_suggestion = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.whitespace,
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: countries
    });
    
    $('input[data-role:"tagsinput"]').typeahead(
        { minLength: 1 },
        { source: countries_suggestion }
    );

});