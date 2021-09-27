<?php

use App\Http\Controllers\Notes\NoteController;
use App\Http\Controllers\Notes\SubjectController;
use Illuminate\Support\Facades\Route;

Route::namespace('Notes')->group(
    fn () =>
    Route::prefix('notes')->group(
        fn () =>
        Route::post('create-new-note', [NoteController::class, 'store']),
        Route::get('', [NoteController::class, 'index'])
    ),
    Route::prefix('subjects')->group(
        fn () =>
        Route::get('', [SubjectController::class, 'index']),
    )
);
