<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use App\Services\BadWordFilter;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(Post $post)
    {
        return $post->comments()->with('user:id,name')->latest()->get();
    }

    public function store(Request $request, Post $post, BadWordFilter $filter)
    {
        if (!auth()->user()) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        $data = $request->validate([
            'body' => ['required','string','min:1','max:2000'],
        ]);

        // Filtro de malas palabras
        $matches = $filter->findMatches($data['body']);
        if (!empty($matches)) {
            return response()->json([
                'message' => 'El comentario contiene palabras prohibidas.',
                'blocked' => $matches,
            ], 422);
        }

        $comment = Comment::create([
            'post_id' => $post->id,
            'user_id' => auth()->id(),
            'body' => $data['body'],
        ]);

        return response()->json($comment->load('user:id,name'), 201);
    }
}