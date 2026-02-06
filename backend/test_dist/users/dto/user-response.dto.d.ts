export declare class UserResponseDto {
    id: number;
    email: string;
    name: string | null;
    role: string;
    passwordHash: string;
    refreshTokens: string[];
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: Partial<UserResponseDto>);
}
