import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { SigninComponent } from './signin.component';
import { DatabaseService } from './../../services/database.service';

// Mocking my database service
class MockAuthService extends DatabaseService {
    onSignin() {
        return 'Mocked';
    }
}


describe('Testing SigninComponent', () => {

    let component: SigninComponent;
    let fixture: ComponentFixture<SigninComponent>;
    let testBedService: DatabaseService;
    let componentService: DatabaseService;
// Set up before testing ...
    beforeEach(() => {

        // Declaring the test component

        TestBed.configureTestingModule({
            declarations: [SigninComponent],
            providers: [DatabaseService]
        });

        // Configure the component with moch and actual database servic providers
        TestBed.overrideComponent(
          SigninComponent,
            { set: { providers: [{ provide: DatabaseService, useClass: MockAuthService }] } }
        );

        // Create component and test fixture
        fixture = TestBed.createComponent(SigninComponent);

        // get test component from the fixture
        component = fixture.componentInstance;

        // AuthService provided to the TestBed
        testBedService = TestBed.get(DatabaseService);

        // AuthService provided by Component, (should return MockAuthService)
        componentService = fixture.debugElement.injector.get(DatabaseService);
    });

    it(' The DatabaseService injected via inject() and TestBed.get() should be of same instance',
        inject([DatabaseService], (injectService: DatabaseService) => {
            expect(injectService).toBe(testBedService);
        })
    );

    it('DatabaseService injected via component should be instance of MockAuthService', () => {
        expect(componentService instanceof MockAuthService).toBeTruthy();
    });
});
