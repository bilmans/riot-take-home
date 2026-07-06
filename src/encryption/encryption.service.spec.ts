import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionService } from './encryption.service';
import { ENCRYPTOR, type Encryptor } from './encryptor';

describe('EncryptionService', () => {
  let service: EncryptionService;
  const encrypt = jest.fn((value: unknown) => `ENC:${JSON.stringify(value)}`);
  const encryptor: Encryptor = {
    encrypt,
    decrypt: (payload) => payload,
    isEncrypted: jest.fn(() => false),
  };

  beforeEach(async () => {
    encrypt.mockClear();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EncryptionService,
        { provide: ENCRYPTOR, useValue: encryptor },
      ],
    }).compile();
    service = module.get(EncryptionService);
  });

  it('passes every depth-1 value to the encryptor, keys unchanged', () => {
    const out = service.encrypt({ name: 'John', age: 30 });

    expect(encrypt).toHaveBeenCalledWith('John');
    expect(encrypt).toHaveBeenCalledWith(30);
    expect(Object.keys(out)).toEqual(['name', 'age']);
  });

  it('does not recurse — a nested object is one depth-1 value', () => {
    const contact = { email: 'a@b.c', phone: '123' };

    service.encrypt({ contact });

    expect(encrypt).toHaveBeenCalledWith(contact);
    expect(encrypt).toHaveBeenCalledTimes(1);
  });

  it('treats array and null as depth-1 values', () => {
    service.encrypt({ tags: [1, 2], mid: null });

    expect(encrypt).toHaveBeenCalledWith([1, 2]);
    expect(encrypt).toHaveBeenCalledWith(null);
  });

  it('returns an empty object unchanged', () => {
    expect(service.encrypt({})).toEqual({});
    expect(encrypt).not.toHaveBeenCalled();
  });
});
