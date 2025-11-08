<?php

return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    // En desarrollo, permitir cualquier origen para evitar bloqueos CORS.
    'allowed_origins' => ['*'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];