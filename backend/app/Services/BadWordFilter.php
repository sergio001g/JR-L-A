<?php

namespace App\Services;

class BadWordFilter
{
    /**
     * Returns array of matches if text contains bad words, otherwise empty array.
     */
    public function findMatches(string $text): array
    {
        $normalized = $this->normalize($text);
        $badWords = array_map(fn($w) => $this->normalize($w), config('badwords.english', []));
        $badWords = array_merge($badWords, array_map(fn($w) => $this->normalize($w), config('badwords.spanish', [])));

        $matches = [];
        foreach ($badWords as $w) {
            if ($w === '') continue;
            $pattern = '/(^|[^a-z0-9])' . preg_quote($w, '/') . '([^a-z0-9]|$)/i';
            if (preg_match($pattern, $normalized)) {
                $matches[] = $w;
            }
        }
        return $matches;
    }

    public function contains(string $text): bool
    {
        return count($this->findMatches($text)) > 0;
    }

    private function normalize(string $text): string
    {
        // Lowercase
        $t = mb_strtolower($text);
        // Remove accents
        if (function_exists('transliterator_transliterate')) {
            $t = transliterator_transliterate('Any-Latin; Latin-ASCII', $t);
        }
        // Replace common leet
        $t = strtr($t, [
            '4' => 'a', '@' => 'a',
            '1' => 'i', '!' => 'i',
            '3' => 'e',
            '0' => 'o',
            '$' => 's',
        ]);
        // Remove punctuation
        $t = preg_replace('/[^a-z0-9\s]/', ' ', $t);
        // Collapse spaces
        $t = preg_replace('/\s+/', ' ', $t);
        return trim($t);
    }
}