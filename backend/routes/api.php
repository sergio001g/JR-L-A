<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\JrController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\CommentController;

Route::middleware('api')->group(function () {
    Route::apiResource('jrs', JrController::class);

    // Auth
    Route::post('auth/register', [AuthController::class, 'register']);
    Route::post('auth/login', [AuthController::class, 'login']);
    Route::post('auth/logout', [AuthController::class, 'logout'])->middleware('token.auth');
    Route::get('auth/me', [AuthController::class, 'me'])->middleware('token.auth');

    // Blog: posts y comentarios
    Route::get('posts', [PostController::class, 'index']);
    Route::get('posts/{post}', [PostController::class, 'show']);
    Route::post('posts', [PostController::class, 'store'])->middleware('token.auth');
    Route::get('posts/{post}/comments', [CommentController::class, 'index']);
    Route::post('posts/{post}/comments', [CommentController::class, 'store'])->middleware('token.auth');
});