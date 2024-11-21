import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  selectedIndex: any = 0;
  title = 'portfolio';
  selectedUrl!: SafeResourceUrl;
  emailK = 'phqrbmc6BVEelXIBC';
  emailJsHandler: any;
  year = '';
  showMenu = false;
  sendingMail = false;

  portfolios: any[] = [
    {
      title: 'Kalabash 54',
      description: 'This is a sample project description.',
      link: 'https://www.kalabash54.com/',
    },
    {
      title: 'Bucca',
      description: 'This is a sample project description.',
      link: 'https://secureid.bucca.com.ng/#/',
    },
    {
      title: 'Insight',
      description: 'This is a sample project description.',
      link: 'https://secureid.sidinsight.com.ng/#/',
    },
    {
      title: 'Breeze',
      description: 'This is a sample project description.',
      link: 'https://nrc.tps.ng/',
    },
    {
      title: 'SecureFare',
      description: 'This is a sample project description.',
      link: 'https://nrc-report.tps.ng/',
    },
    {
      title: 'Taxset',
      description: 'This is a sample project description.',
      link: 'https://taxset-87694.web.app/',
    },
    {
      title: 'Codessy',
      description: 'This is a sample project description.',
      link: 'https://codessy.io/',
    },
    {
      title: 'SecurePay',
      description: 'This is a sample project description.',
      link: 'https://dashboard.getsecurepay.ai/auth/login',
    },
    {
      title: 'Door to Door',
      description: 'This is a sample project description.',
      link: 'https://d2d-frontend-dev.secureid-digital.com.ng/',
    },
    {
      title: 'Pally',
      description: 'This is a sample project description.',
      link: 'https://mypally.net/',
    },
  ];
  loaded = true;
  emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private sanitizer: DomSanitizer, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      from_name: ['', [Validators.required]],
      user_email: [
        '',
        [Validators.required, Validators.pattern(this.emailRegex)],
      ],
      user_phone: ['', []],
      message: ['', [Validators.required]],
    });
    this.year = new Date().getFullYear().toString();
    this.selectedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.portfolios[0].link
    );

    this.emailJsHandler = (window as any).emailjs
      .init({
        publicKey: this.emailK,
      })(window as any)
      .emailjs.send('contact_service', 'contact_form', {});
  }

  get from_name() {
    return this.form.get('from_name') as FormControl;
  }
  get user_email() {
    return this.form.get('user_email') as FormControl;
  }
  get user_phone() {
    return this.form.get('user_phone') as FormControl;
  }
  get message() {
    return this.form.get('message') as FormControl;
  }

  onUrlChange(link: any, index: any) {
    this.loaded = false;
    this.selectedIndex = index;
    this.selectedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(link);
    setTimeout(() => {
      this.loaded = true;
    }, 5000);
  }

  hideMenu(event: any) {
    event.preventDefault();
    console.log('hidden');
  }

  onSubmit() {
    if (this.form.invalid) {
      alert('One or more input field is invalid.');
      Object.keys(this.form.controls).forEach((field) => {
        this.form.controls[field].markAsTouched();
        this.form.controls[field].updateValueAndValidity();
      });
      return;
    }
    this.sendingMail = true;
    (window as any).emailjs
      .send('contact_service', 'contact_form', {
        ...this.form.value,
      })
      .then(
        (response: any) => {
          this.sendingMail = false;
          alert('SUCCESS! ' + response.status + ' ' + response.text);
        },
        (error: any) => {
          this.sendingMail = false;
          alert('FAILED, could not connect to Seun');
        }
      );
  }
}
