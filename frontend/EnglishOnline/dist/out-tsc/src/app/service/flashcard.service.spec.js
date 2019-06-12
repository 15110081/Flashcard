import { TestBed } from '@angular/core/testing';
import { FlashcardService } from './flashcard.service';
describe('FlashcardService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(FlashcardService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=flashcard.service.spec.js.map