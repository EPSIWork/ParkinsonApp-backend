export interface UserTypingData {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    type: string;
    details: string;
    userId: string;
}