<?php
return [

    'paths' => ['api/*', 'exams', '*'], // thêm 'exams' hoặc '*' cho chắc

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:3000,invalid url, do not cite,http://localhost:3001','*'], // ⚡ cho đúng frontend của bạn
    // hoặc ['*'] cho tất cả, nhưng nên ghi cụ thể cho an toàn.

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];


