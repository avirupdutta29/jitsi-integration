import { DialogComponent } from './../shared/components/dialog/dialog.component';
import { Component, Input, NgModule, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { faMicrophoneSlash, faPhoneSlash, faMicrophone, faVideoSlash, faVideo, faFilm, faTableCellsLarge, faLock, faCircleXmark, faExpand, faMessage, faHand, faRecordVinyl, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { GeneralService } from '../shared/services/general.service';
import { data } from 'jquery';


declare var JitsiMeetExternalAPI: any;



library.add(fas);

@Component({
    selector: 'app-jitsi',
    templateUrl: './jitsi.component.html', 
    styleUrls: ['./jitsi.component.css']
})





export class JitsiComponent  {
    [x: string]: any;

    faPhoneSlash=faPhoneSlash;
    faMicrophoneSlash=faMicrophoneSlash;
    faMicrophone=faMicrophone;
    faVideoSlash=faVideoSlash;
    faVideo=faVideo;
    faFilm=faFilm;
    faExpand=faExpand;
    faTableCellsLarge=faTableCellsLarge;
    faLock=faLock;
    faCircleXmark=faCircleXmark;
    faMessage=faMessage;
    faHand=faHand;
    faRecordVinyl=faRecordVinyl;
    faUserGroup=faUserGroup;

    

    domain: string="jitsi.exzatech.com:8443";
    room: any;
    user: any;
    api: any;
    options: any;
    apiObj: any;
    elem: any;
    enabled!: Boolean;

    allowScreenSharing= false;
    allowCamera=false;
    
    sharingScreen=false;
    
    isAudioMuted= false;
    isVideoMuted= false;
    
    participantRoleChanged: any;
    meetingId: any;

    clicked=0;
    session: any;
    session2: any;
    shareScreenEnabled:any;
    showParticipants=0;
    MyArrayType=[];

   
    roomNameInfo: any
    
   
   
    constructor(
        private router: Router ,
        public generalService: GeneralService,
        public generalComponent: DialogComponent
        
    ){}


   

    
        ngOnInit(): void {
            $(function(){
                $('#btnStart').on('click',function(){
                    var meetingId = $('#txtMeetingId').val();
                    var dispNme = $('#txtDispNme').val();
                    StartMeeting(meetingId,dispNme);
                });
            }); 
    }
     
    StartMeeting() {
        
       
        var meetingId = $('#txtMeetingId').val();
        var dispNme = $('#txtDispNme').val();
        
        

        this.options = {
             
            roomName: meetingId,                                    //The name of the room to join.
            width: 650,                                            //The created IFrame width.
            height:500,                                            //The height for the created IFrame.
            
            DEFAULT_REMOTE_DISPLAY_NAME:'New_User',
            configOverwrite: {proJoinPageEnable: false,
                              startWithAudioMuted: true,
                              doNotStoreRoom: true,
                              startVideoMuted: 0,
                              startWithVideoMuted: true, 
                              SHOW_JITSI_WATERMARK: false,
                              enableWelcomePage: true,
                              prejoinPageEnabled: false,
                              disableRemoteMute: true,
                              remoteVideoMenu: {
                                  disableKick: true
                              },
                              TOOLBAR_ALWAYS_VISIBLE: true,
                              
                          },         //The JS object with overrides for options defined in the config.js file.
            interfaceConfigOverwrite: {
                TILE_VIEW_MAX_COLUMN: 8,
                DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
                DEFAULT_LOGO_URL: 'images/eXzaTech-Transparent_White.png',
                filmStripOnly: false,
                DISPLAY_WELCOME_PAGE_CONTENT: false,
                SHOW_JITSI_WATERMARK: false,
                TOOLBAR_ALWAYS_VISIBLE: true,
                SHOW_WATERMARK_FOR_GUESTS: false,
                DEFAULT_REMOTE_DISPLAY_NAME: 'New User',
                TOOLBAR_BUTTONS: [
                    'microphone', 'fullscreen', 'camera',
                    'hangup', 'profile', '', 'chat', 'recording',
                    'livestreaming', 'sharedvideo','raisehand',
                    'tileview', 'videobackgroundblur',
                    'e2ee'
                  ],
                
            }, 
            //overrideConfigJSON(interfaceConfigOverWrite),
            parentNode: document.querySelector('#jitsi-iframe'),   //HTML DOM element where IFRAME  is added as a child
            userInfo : {
                //displayName:this.user.name,
                displayName:dispNme,
                email: 'avirup@exzatechconsulting.com',
                moderator: true
            },
            onload: function () {
                //alert('loaded');
                $('#toolbox').show();
            }

            
         };

         
        console.log(this.options.roomName);
        this.api= new JitsiMeetExternalAPI(this.domain, this.options); 
        
        var data=$('#txtPassword').val();

        this.api.addEventListener('participantRoleChanged', (event: { role: string; }) => {

            console.log("The role for the first time is : ", event);

            // when host has joined the video conference 
            if (event.role === 'moderator') {

                // var data = {
                //     id = event.
                // }

                console.log("1. The event inside here is ", event);
                console.log("The roomname is ",this.options.roomName)
    
                this.api.executeCommand('password', data);
                
                this.allowScreenSharing = true;    
                this.allowCamera=true;                                       //To enable the checkbox to enable ScreenSharing button
                localStorage.setItem('shareScreenEnabled',JSON.stringify(this.clicked))
            }
    
            else {
                setTimeout(() => {

                

                    console.log("2. The event Inside here is ", event);
                    console.log("The roomname is ",this.options.roomName)

                // why timeout: I got some trouble calling event listeners without setting a timeout :)
    
                    // when local user is trying to enter in a locked room 
                    let data1: any;
                    let data2: any;
                    
                    data1=localStorage.getItem('shareScreenEnabled')
                    data2=localStorage.getItem('roomNameStored');
        
                    this.session=JSON.parse(data1);
                    this.session2=JSON.parse(data2);
                    
                    if(event.role=='none' && this.session2==this.options.roomName){
                        if(this.session == 1) {
                            this.sharingScreen=true;
                            console.log("Here the role is ", event.role)
                    }
                }
    
                    this.api.addEventListener('passwordRequired', () => {

                        this.api.executeCommand('password', data);
    
                    });
    
                    // when local user has joined the video conference 
                    this.api.addEventListener('videoConferenceJoined', (response: any) => {    

                        setTimeout(() =>{ this.api.executeCommand('password', data);}, 300);
                        
    
                    });

                    console.log("The room name here is ", this.options.roomName);
                    console.log("The name of the moderator is ", dispNme );
                    this.roomNameInfo=this.options.roomName;
                    localStorage.setItem('roomNameStored',JSON.stringify(this.roomNameInfo))  
                    
                       
    
                }, 10);
            }
        });

     

        

}


 //To check whether the Share Screen Check Box has been clicked or not
 checkBoxClicked() {

    console.log('Number of times CheckBox Clicked : ', this.clicked);
    this.clicked=0;    
    this.sharingScreen=true;                                            //Only for the moderator at the first place
        ++this.clicked;
        localStorage.setItem('shareScreenEnabled',JSON.stringify(this.clicked))        //Storing the number of Times check box clicked in Local Storage
        this.clicked=0;     
}

enableCamera(){
    this.options.interfaceConfigOverwrite.TOOLBAR_BUTTONS.push('camera');
}

//For Hangup, Enable Audio, Enable Video, Allow Sharing of screen

    Command(command: string) {
    
        //this.api.executeCommand(command);
    
        if(command =='hangup'){
            this.api.executeCommand('hangup');
            //this.router.navigate(['/thank-you']);
            
        }
        if(command=='toggleAudio'){
            this.api.executeCommand('toggleAudio');
            this.isAudioMuted = !this.isAudioMuted;
        }
        if(command=='toggleVideo') {
            this.api.executeCommand('toggleVideo');
            this.isVideoMuted = !this.isVideoMuted;
        }


        if(command=='toggleShareScreen') {
            
            this.api.executeCommand('toggleShareScreen');

            this.api.addEventListener('participantRoleChanged', (event: { role: string; }) => {

                console.log(event.role);

            if (event.role=='moderator'){

                console.log(event.role);
                this.api.executeCommand('toggleShareScreen');
            }

            else {
                
                console.log(event.role);
                console.log("Only moderator can share the screen");

            }
          })
        }


        if(command=='toggleTileView'){
            this.api.executeCommand('toggleTileView');
        }

        if(command=='toggleFullScreen'){
            console.log('Hello');
            this.api.executeCommand('toggleFullScreen');
        }

   
            this.participantRoleChanged= async (event: any) => {
                console.log(event.role);
        if (event.role === "moderator") {
            this.api.executeCommand('password', 'The Password');
        }
    }
        if(command=='resizeLargeVideo'){
           
            this.api.resizeLargeVideo(600, 600);
    
        }

        if(command=='toggleChat'){
            this.api.executeCommand('toggleChat');
        }

        if(command=='toggleRaiseHand'){
            this.api.executeCommand('toggleRaiseHand');
        }

        if(command=='toggleParticipantsPane'){

            console.log("Hello Avirup")
            this.api.executeCommand('toggleParticipantsPane');
        }

        if(command == 'startRecording'){
            this.api.executeCommand('startRecording',{
                mode: 'stream',
                youtubeStreamKey: '75m7-mpkk-0g0p-mhxy-11rd'
                // shouldShare: true,
                // rtmpStreamKey: 'test'
            });
        }

        if(command=='toggleParticipantsPane'){
            this.showParticipants++;
            this.api.executeCommand('toggleParticipantsPane', this.enabled=true);
            // The visibility status of the participants pane.

        }
    }
   
}


function StartMeeting(meetingId: string | number | string[] | undefined, dispNme: string | number | string[] | undefined) {
    throw new Error('Function not implemented.');
}

function meetingId(meetingId: any, dispNme: any) {
    throw new Error('Function not implemented.');
}

function dispNme(meetingId: (meetingId: any, dispNme: any) => void, dispNme: any) {
    throw new Error('Function not implemented.');
}

function myFunc(num1: any) {
    throw new Error('Function not implemented.');
}

function num1(num1: any) {
    throw new Error('Function not implemented.');
}

function showForm() {
    throw new Error('Function not implemented.');
}

function onCreate() {
    throw new Error('Function not implemented.');
}

function password() {
    throw new Error('Function not implemented.');
}

function enabled(arg0: string, enabled: any, arg2: boolean) {
    throw new Error('Function not implemented.');
}



