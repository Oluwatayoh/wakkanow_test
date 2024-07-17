import { NgModule } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSquare, faCheckSquare, faEye } from '@fortawesome/free-regular-svg-icons';
import { faStackOverflow, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule]
})
export class FontAwesomeCustomModule {
  constructor(library: FaIconLibrary) {
    // Add icons to the library
    library.addIcons(
      faSquare,
      faCheckSquare,
      faStackOverflow,
      faGithub,
      faMedium,
      faEye,
      faDoorOpen
    );
  }
}
