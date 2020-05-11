import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
name:String;
username:String;
email:String;
password:String;
  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService) { }

  ngOnInit(): void {
  }
onRegisterSubmit()
{
 const user = {
   name: this.name,
   email: this.email,
   username: this.username,
   password: this.password
 }
      if(!this.validateService.validateRegister(user))
      {
      this.flashMessage.show('please fill all fields',{cssClass:'alert-danger',timeout:3000});
      return false;
      }
      if(!this.validateService.validateEmail(user.email))
      {
      this.flashMessage.show('please enter a valid email',{cssClass:'alert-info',timeout:3000});
      console.log();
      return false;
      }

      //Registering user
      this.authService.registerUser(user).subscribe(d =>{
      this.flashMessage.show('Your Successfully Registered',{cssClass:'alert-success',timeout:3000});
      });
}
}
