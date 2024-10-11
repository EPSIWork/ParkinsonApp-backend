const suspiciousWords = [
    'bank',
    'banque',
    'iban',
    'transfer',
    'account',
    'deposit',
    'withdraw',
    'transaction',
    'routing number',
    'swift code',
    'sort code',
    'account number',
    'credit card number',
    'cvv',
    'expiration date',
    'pin',
    'password',
    'security question',
    'login',
    'username',
    'identity',
    'ssn',
    'social security number',
    'tax id',
    'passport',
    'driver license',
];

export const isSuspiciousContent = async (message: string) : Promise<boolean> => {
    for (let word of suspiciousWords) {
        if (message.includes(word)) {
            return true;
        }
    }
    return false;
}