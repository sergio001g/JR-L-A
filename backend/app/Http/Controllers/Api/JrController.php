<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Jr;
use Illuminate\Http\Request;

class JrController extends Controller
{
    public function index()
    {
        return Jr::orderByDesc('id')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $jr = Jr::create($data);
        return response()->json($jr, 201);
    }

    public function show(Jr $jr)
    {
        return $jr;
    }

    public function update(Request $request, Jr $jr)
    {
        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $jr->update($data);
        return $jr;
    }

    public function destroy(Jr $jr)
    {
        $jr->delete();
        return response()->json(null, 204);
    }
}