import Component, { ComponentProps } from './Component';
import EventBus from './EventBus';

jest.mock('uuid', () => ({
    v4: () => 'mock-uuid'
}));
jest.mock('./EventBus');

class TestComponent extends Component<ComponentProps> {
    constructor(props: ComponentProps = {}) {
        super('div', props);
    }
    render(): HTMLElement | DocumentFragment {
        const element = document.createElement('div');
        element.textContent = 'Test Component';
        return element;
    }
}

describe('Component', () => {
    let component: TestComponent;

    beforeEach(() => {
        document.body.innerHTML = '';
        component = new TestComponent();
    });

    describe('Constructor', () => {
        test('компоненту должен быть присвоен id', () => {
            expect(component['_id']).toBe('mock-uuid');
        });
        test('компоненту должен быть присвоен tagName', () => {
            expect(component['_tagName']).toBe('div');
        });
        test('компоненту должен быть присвоен element', () => {
            expect(component['_element']).toBeUndefined();
        });
        test('компоненту должен быть присвоен eventBus', () => {
            expect(component['_eventBus']).toBeInstanceOf(EventBus);
        });
        test('компоненту должен быть присвоен INIT', () => {
            const eventBus = component['_eventBus'];
            const onSpy = jest.spyOn(eventBus, 'on');
            expect(onSpy).toHaveBeenCalledWith(
                Component.EVENTS.INIT,
                expect.any(Function)
            );
        });
        test('у компонента должно срабатывать событие INIT при создании', () => {
            const eventBus = component['_eventBus'];
            const emitSpy = jest.spyOn(eventBus, 'emit');
            new TestComponent();
            expect(emitSpy).toHaveBeenCalledWith(Component.EVENTS.INIT);
        });
        test('компоненту должен быть присвоен FLOW_CDM', () => {
            const eventBus = component['_eventBus'];
            const onSpy = jest.spyOn(eventBus, 'on');
            expect(onSpy).toHaveBeenCalledWith(
                Component.EVENTS.FLOW_CDM,
                expect.any(Function)
            );
        });
        test('у компонента должно срабатывать событие FLOW_CDM при монтировании', () => {
            const eventBus = component['_eventBus'];
            const emitSpy = jest.spyOn(eventBus, 'emit');
            component.dispatchComponentDidMount();
            expect(emitSpy).toHaveBeenCalledWith(Component.EVENTS.FLOW_CDM);
        });
        test('компоненту должен быть присвоен FLOW_CDU', () => {
            const eventBus = component['_eventBus'];
            const onSpy = jest.spyOn(eventBus, 'on');
            expect(onSpy).toHaveBeenCalledWith(
                Component.EVENTS.FLOW_CDU,
                expect.any(Function)
            );
        });
        test('у компонента должно срабатывать событие FLOW_CDU при создании', () => {
            const eventBus = component['_eventBus'];
            const emitSpy = jest.spyOn(eventBus, 'emit');
            component.setProps({src: 'https://ya-praktikum.tech/test/'})
            expect(emitSpy).toHaveBeenCalledWith(Component.EVENTS.FLOW_CDU,
                {"__id": "mock-uuid"},
                {"__id": "mock-uuid", "src": "https://ya-praktikum.tech/test/"});
        });
        test('компоненту должен быть присвоен FLOW_RENDER', () => {
            const eventBus = component['_eventBus'];
            const onSpy = jest.spyOn(eventBus, 'on');
            expect(onSpy).toHaveBeenCalledWith(
                Component.EVENTS.FLOW_RENDER,
                expect.any(Function)
            );
        });
        test('у компонента должно срабатывать событие FLOW_RENDER при рендере', () => {
            const eventBus = component['_eventBus'];
            const emitSpy = jest.spyOn(eventBus, 'emit');
            component.init();
            expect(emitSpy).toHaveBeenCalledWith(Component.EVENTS.FLOW_RENDER);
        });
    });
    describe('Настройка Props', () => {
        test('переданные пропсы должны быть применены в компоненте', () => {
            component = new TestComponent({classes: 'test_class'});
            expect(component['_props'].classes).toBe('test_class');
        });
        test('переданные пропсы в setProps должны быть применены в компоненте', () => {
            const newProps: ComponentProps = {
                testProp: 'newValue',
            };
            component.setProps(newProps);
            expect(component['_props'].testProp).toBe('newValue');
        });
        test('переданные пропсы в setProps должны изменить заданные при создании пропсы', () => {
            component = new TestComponent({classes: 'test_class'});
            const classes: ComponentProps = {
                classes: 'newValue',
            };
            component.setProps(classes);
            expect(component['_props'].classes).toBe('newValue');
        });
        test('переданные пустые пропсы не вызывают событие FLOW_CDU компонента', () => {
            const eventBus = component['_eventBus'];
            const emitSpy = jest.spyOn(eventBus, 'emit');
            component.setProps({});
            expect(emitSpy).not.toHaveBeenCalledWith(Component.EVENTS.FLOW_CDU);
        });
        test('переданные пустые пропсы не вызывают событие FLOW_RENDER компонента', () => {
            const eventBus = component['_eventBus'];
            const emitSpy = jest.spyOn(eventBus, 'emit');
            component.setProps({});
            expect(emitSpy).not.toHaveBeenCalledWith(Component.EVENTS.FLOW_RENDER);
        });
    });
});
