import {
    loginValidation,
    emailValidation,
    passwordValidation,
    emptyValidation,
    nameValidation,
    phoneValidation, checkForm
} from './Validation';

describe('Validation', () => {
    describe('loginValidation', () => {
        test('должен принимать валидный логин с цифрами, латинскими буквами, дефисом и подчёркиваниями', () => {
            const input = document.createElement('input');
            input.value = 'max_payne-mona_sax1';
            const result = loginValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(false);
            expect(result).toBeUndefined();
        });
        test('должен принимать логин из 3-х букв', () => {
            const input = document.createElement('input');
            input.value = 'x';
            const result = loginValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(false);
            expect(result).toBeUndefined();
        });
        test('должен принимать валидный логин из 20-ти символов', () => {
            const input = document.createElement('input');
            input.value = '1max-payne_mona-sax1';
            const result = loginValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(false);
            expect(result).toBeUndefined();
        });
        test('не должен принимать невалидный логин с пробелом', () => {
            const input = document.createElement('input');
            input.value = 'max payne';
            const result = loginValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
        test('не должен принимать невалидный логин с не латинскими буквами', () => {
            const input = document.createElement('input');
            input.value = 'max пейн';
            const result = loginValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
        test('не должен принимать невалидный логин в котором меньше 3-х букв', () => {
            const input = document.createElement('input');
            input.value = 'mo';
            const result = loginValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
        test('не должен принимать невалидный логин в котором больше 20-ти символов', () => {
            const input = document.createElement('input');
            input.value = 'qwertyuiasdfghj51243x';
            const result = loginValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
        test('не должен принимать невалидный логин в котором есть спецсимволы', () => {
            const input = document.createElement('input');
            input.value = 'max_payne&mona_sax';
            const result = loginValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
    });

    describe('passwordValidation', () => {
        test('должен принимать валидный пароль из 8-ми символов', () => {
            const input = document.createElement('input');
            input.value = 'Gfhjkm76';
            const result = passwordValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(false);
            expect(result).toBeUndefined();
        });
        test('должен принимать валидный пароль из 40-ка символов', () => {
            const input = document.createElement('input');
            input.value = 'Gfhjkm76Ienrf3GtnzBDjkrRkfcysqVekmnbr100';
            const result = passwordValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(false);
            expect(result).toBeUndefined();
        });
        test('не должен принимать невалидный пароль меньше 8-ми символов', () => {
            const input = document.createElement('input');
            input.value = 'Fhjkm76';
            const result = passwordValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
        test('не должен принимать невалидный пароль больше 40-ка символов', () => {
            const input = document.createElement('input');
            input.value = 'Gfhjkm76Ienrf3GtnzBDjkrRkfcysqVekmnbr1001';
            const result = passwordValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
        test('не должен принимать невалидный пароль без цифр', () => {
            const input = document.createElement('input');
            input.value = 'TestGfhjkm';
            const result = passwordValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
        test('не должен принимать невалидный пароль без заглавной буквы', () => {
            const input = document.createElement('input');
            input.value = 'gfhjkm76';
            const result = passwordValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
    });

    describe('emptyValidation', () => {
        test('должен принимать если в строке есть хотя бы один символ', () => {
            const input = document.createElement('input');
            input.value = 'й';
            const result = emptyValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(false);
            expect(result).toBeUndefined();
        });
        test('должен принимать если в строке есть хотя бы один спец символ', () => {
            const input = document.createElement('input');
            input.value = '@';
            const result = emptyValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(false);
            expect(result).toBeUndefined();
        });
        test('не должен принимать пустую строку', () => {
            const input = document.createElement('input');
            input.value = '';
            const result = emptyValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
        test('не должен принимать несколько пробелов', () => {
            const input = document.createElement('input');
            input.value = '    ';
            const result = emptyValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
    });

    describe('emailValidation', () => {
        test('должен принимать валидный email', () => {
            const input = document.createElement('input');
            input.value = 'test@test.ru';
            const result = emailValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(false);
            expect(result).toBeUndefined();
        });
        test('должен принимать валидный email c цифрами, спецсимволами (дефис и подчёркивания) и «собакой» (@)', () => {
            const input = document.createElement('input');
            input.value = 'max.payne-mona_sax1234567@test.test.ru';
            const result = emailValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(false);
            expect(result).toBeUndefined();
        });
        test('не должен принимать невалидный email без «собаки» (@)', () => {
            const input = document.createElement('input');
            input.value = 'test-email.ya.ru';
            const result = emailValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
        test('не должен принимать невалидный email с не латинскими буквами', () => {
            const input = document.createElement('input');
            input.value = 'тест@test.ru';
            const result = emailValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
        test('не должен принимать невалидный email с спецсимволами которые отличаются от дефиса и подчёркивания', () => {
            const input = document.createElement('input');
            input.value = 'test%test@test.ru';
            const result = emailValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
        test('не должен принимать невалидный email с точкой в начале', () => {
            const input = document.createElement('input');
            input.value = '.test@test.ru';
            const result = emailValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
        test('не должен принимать невалидный email с точкой в конце', () => {
            const input = document.createElement('input');
            input.value = 'test@test.ru.';
            const result = emailValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
    });

    describe('nameValidation', () => {
        test('должен принимать валидное имя написанное латиницей', () => {
            const input = document.createElement('input');
            input.value = 'Bob';
            const result = nameValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(false);
            expect(result).toBeUndefined();
        });
        test('должен принимать валидное имя написанное кириллицей', () => {
            const input = document.createElement('input');
            input.value = 'Фёкла';
            const result = nameValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(false);
            expect(result).toBeUndefined();
        });
        test('не должен принимать не валидное имя которое начинается с маленькой буквы', () => {
            const input = document.createElement('input');
            input.value = 'максим';
            const result = nameValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
        test('не должен принимать не валидное имя которое содержит пробел', () => {
            const input = document.createElement('input');
            input.value = 'Ева Мария';
            const result = nameValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
        test('не должен принимать не валидное имя которое содержит цифры', () => {
            const input = document.createElement('input');
            input.value = 'SuperBot0';
            const result = nameValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
        test('не должен принимать не валидное имя которое содержит спецсимвол', () => {
            const input = document.createElement('input');
            input.value = 'Eva$Maria';
            const result = nameValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
    });

    describe('phoneValidation', () => {
        test('должен принимать валидный номер телефона с плюсом в начале', () => {
            const input = document.createElement('input');
            input.value = '+79581563258';
            const result = phoneValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(false);
            expect(result).toBeUndefined();
        });
        test('должен принимать валидный номер телефона из 10-ти цифр', () => {
            const input = document.createElement('input');
            input.value = '9581563258';
            const result = phoneValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(false);
            expect(result).toBeUndefined();
        });
        test('должен принимать валидный номер телефона из 15-ти цифр', () => {
            const input = document.createElement('input');
            input.value = '958156325827473';
            const result = phoneValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(false);
            expect(result).toBeUndefined();
        });
        test('не должен принимать валидный номер телефона с плюсом в начале из 9-ти цифр', () => {
            const input = document.createElement('input');
            input.value = '+795815632';
            const result = phoneValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
        test('не должен принимать валидный номер телефона из 16-ти цифр', () => {
            const input = document.createElement('input');
            input.value = '9581563258274743';
            const result = phoneValidation({ target: input } as unknown as Event);
            expect(input.classList.contains('input_base--error')).toBe(true);
            expect(result).toBeUndefined();
        });
    });

    describe('checkForm', () => {
        let form: HTMLFormElement;
        let input1: HTMLInputElement;
        let input2: HTMLInputElement;
        beforeEach(() => {
            form = document.createElement('form');
            input1 = document.createElement('input');
            input2 = document.createElement('input');
            form.appendChild(input1);
            form.appendChild(input2);
        });
        test('должен возвращать true, если один из инпутов имеет класс input_base--error', () => {
            input1.classList.add('input_base--error');
            const result = checkForm(form);
            expect(result).toBe(true);
        });
        test('должен возвращать false, если ни один инпут не имеет класса input_base--error', () => {
            const result = checkForm(form);
            expect(result).toBe(false);
        });
        test('должен вызывать событие blur на каждом инпуте', () => {
            const spy1 = jest.spyOn(input1, 'dispatchEvent');
            const spy2 = jest.spyOn(input2, 'dispatchEvent');
            checkForm(form);
            expect(spy1).toHaveBeenCalledWith(expect.any(Event));
            expect(spy2).toHaveBeenCalledWith(expect.any(Event));
            const blurEvent1 = spy1.mock.calls[0][0];
            const blurEvent2 = spy2.mock.calls[0][0];
            expect(blurEvent1.type).toBe('blur');
            expect(blurEvent2.type).toBe('blur');
        });
    });
});