<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return Post::orderByDesc('id')->get(['id','title','body','author_id','created_at']);
    }

    public function show(Post $post)
    {
        $post->load(['author:id,name', 'comments' => function($q){ $q->latest(); }]);
        return $post;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required','string','min:2','max:255'],
            'body' => ['nullable','string'],
        ]);
        $data['author_id'] = optional(auth()->user())->id;
        $post = Post::create($data);
        return response()->json($post, 201);
    }
}