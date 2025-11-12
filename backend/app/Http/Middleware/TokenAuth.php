<?php

namespace App\Http\Middleware;

use App\Models\ApiToken;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TokenAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        $header = $request->header('Authorization');
        if ($header && str_starts_with($header, 'Bearer ')) {
            $plain = substr($header, 7);
            $hash = hash('sha256', $plain);
            $token = ApiToken::where('token_hash', $hash)->first();
            if ($token && (!$token->expires_at || $token->expires_at->isFuture())) {
                $token->forceFill(['last_used_at' => now()])->save();
                $user = User::find($token->user_id);
                if ($user) {
                    auth()->setUser($user);
                }
            }
        }

        return $next($request);
    }
}