<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\JrController;

Route::middleware('api')->group(function () {
    Route::apiResource('jrs', JrController::class);
});