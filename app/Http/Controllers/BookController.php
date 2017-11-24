<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Book;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('book.add_edit_book');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(),
            [
                'title' => 'required',
                'name' => 'required',
                'author' => 'required',
                'status' => 'required|numeric',
                'want_to' => 'required|numeric'
            ],
            [
                'title' => 'the Title field is required',
                'name' => 'the Name field is required',
                'author' => 'the Author field is required',
                'status' => 'the Status field is required',
                'want_to' => 'the Want_to field is not empty'
            ]
        );
        if ($validate->fails()) {
            return redirect()->route('add_book')
                             ->withErrors($validate)
                             ->withInput();
        } else {
            $book = new Book;
            $book->title = $request->title;
            $book->name  = $request->name;
            $book->author = $request->author;
            $book->status = $request->status;
            $book->want_to = $request->want_to;
            $book->save();
            dd($book);

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}