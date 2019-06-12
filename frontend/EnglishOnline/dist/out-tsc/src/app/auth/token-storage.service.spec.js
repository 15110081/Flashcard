import { TestBed, inject } from '@angular/core/testing';
import { TokenStorageService } from './token-storage.service';
describe('TokenStorageService', function () {
    beforeEach(function () {
        TestBed.configureTestingModule({
            providers: [TokenStorageService]
        });
    });
    it('should be created', inject([TokenStorageService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=token-storage.service.spec.js.map