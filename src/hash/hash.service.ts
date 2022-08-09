import { pbkdf2Sync } from 'crypto';
import { Injectable } from '@nestjs/common';
import { SALT } from 'src/shared/constants';


@Injectable()
export class HashService {
    hashPassword(password: string) {
        const hashed = pbkdf2Sync(password, SALT, 6, 100, 'sha512').toString('hex')
        return hashed
    }

    comparePassword(candidatePassword: string, password: string) {
        return pbkdf2Sync(candidatePassword, SALT, 6, 100, 'sha512').toString('hex') === password
    }
}
