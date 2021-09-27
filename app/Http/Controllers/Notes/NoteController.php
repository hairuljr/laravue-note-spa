<?php

namespace App\Http\Controllers\Notes;

use App\Http\Controllers\Controller;
use App\Http\Resources\NoteResource;
use App\Models\{Note, Subject};

class NoteController extends Controller
{
    public function index()
    {
        $notes = Note::with('subject')->latest()->get();
        return NoteResource::collection($notes);
    }

    public function show(Note $note)
    {
        return NoteResource::make($note);
    }

    public function store()
    {
        sleep(2);
        request()->validate([
            'subject' => 'required|exists:subjects,id',
            'title' => 'required|min:3',
            'description' => 'required',
        ]);

        $subject = Subject::findOrFail(request('subject'));
        $note = Note::create([
            'subject_id' => $subject->id,
            'title' => request('title'),
            'slug' => \Str::slug(request('title')),
            'description' => request('description'),
        ]);

        return response()->json([
            'message' => 'Your note was created',
            'note' => $note,
        ]);
    }

    public function update(Note $note)
    {
        request()->validate([
            'subject' => 'required|exists:subjects,id',
            'title' => 'required|min:3',
            'description' => 'required',
        ]);
        sleep(2);

        $subject = Subject::findOrFail(request('subject'));
        $note->update([
            'subject_id' => $subject->id,
            'title' => request('title'),
            'description' => request('description'),
        ]);

        return response()->json([
            'message' => 'Your note was updated',
            'note' => $note,
        ]);
    }

    public function destroy(Note $note)
    {
        sleep(2);
        $note->delete();

        return response()->json([
            'message' => 'Your note was delete',
        ], 200);
    }
}
