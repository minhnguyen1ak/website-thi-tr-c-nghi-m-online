<?php

    namespace App\Http\Controllers\Api;

    use App\Http\Controllers\Controller;
    use Illuminate\Http\Request;
    use App\Models\User;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Support\Facades\Validator;

    class AuthController extends Controller
    {
        public function register(Request $request)
        {
            $validator = Validator::make($request->all(), [
                 'username' => 'required|string|max:255|unique:users,username',
                 'email' => 'required|email|unique:users,email',
                 'password' => 'required|string|min:6',
                 'confirmPassword' => 'required|same:password',
                 'role' => 'required|string|in:user,admin',
            ]);

            if ($validator->fails()) {
                 return response()->json(['errors' => $validator->errors()], 400);
            }

            $user = User::create([
                 'username' => $request->username,
                 'email' => $request->email,
                 'password' => Hash::make($request->password),
                 'role' => $request->role,
            ]);

            return response()->json(['message' => 'User registered successfully!'], 201);
        }

        public function login(Request $request)
{
    $validator = Validator::make($request->all(), [
        'username' => 'required|string',
        'password' => 'required|string|min:6',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 400);
    }

    try {
        // Tìm người dùng trong bảng users dựa trên username
        $user = User::where('username', $request->username)->first();

        // Kiểm tra xem người dùng có tồn tại và mật khẩu có khớp không
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Tên đăng nhập hoặc mật khẩu không đúng!'], 401);
        }

        // Trả về thông tin người dùng (bao gồm user_id)
        return response()->json([
            'message' => 'Đăng nhập thành công!',
            'user' => [
                'user_id' => $user->id, // Trả về ID của người dùng
                'username' => $user->username,
                'role' => $user->role,
            ]
        ], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}
}