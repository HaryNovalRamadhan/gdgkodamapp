import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gdgkodamapp';

  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;

  scanCountdown = 5;
  kodamCountdown = 10;
  showResult = false;
  kodamResult = '';
  faceImageSrc = '';
  kodamList = [
    'Nyi roro Android',
    'Flutter',
    'Firebase',
    'Angular',
    'Chrome',
    'Tensor Flow',
    'Tensor Flow',
    'Google Cloud',
    'Golang'
  ];

  ngOnInit(): void {
    this.startVideoStream();
    this.startScanCountdown();
  }

  // Start video stream from camera
  startVideoStream(): void {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        this.videoElement.nativeElement.srcObject = stream;
      })
      .catch((error) => console.error("Error accessing camera:", error));
  }

  // Capture an image from the video stream
  captureImage(): string {
    const canvas = document.createElement('canvas');
    canvas.width = this.videoElement.nativeElement.videoWidth;
    canvas.height = this.videoElement.nativeElement.videoHeight;
    const context = canvas.getContext('2d');
    context?.drawImage(this.videoElement.nativeElement, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/png');
  }

  // Start the scan countdown
  startScanCountdown(): void {
    this.scanCountdown = 5;
    const scanInterval = setInterval(() => {
      this.scanCountdown--;

      if (this.scanCountdown <= 0) {
        clearInterval(scanInterval);
        this.showKodam();
      }
    }, 1000);
  }

  // Display the kodam and result
  showKodam(): void {
    this.kodamResult = this.kodamList[Math.floor(Math.random() * this.kodamList.length)];
    this.faceImageSrc = this.captureImage();
    this.showResult = true;
    this.startKodamCountdown();
  }

  // Start the countdown to return to scanning
  startKodamCountdown(): void {
    this.kodamCountdown = 10;
    const kodamInterval = setInterval(() => {
      this.kodamCountdown--;

      if (this.kodamCountdown <= 0) {
        clearInterval(kodamInterval);
        this.showResult = false;
        this.startVideoStream();
        this.startScanCountdown();
      }
    }, 1000);
  }
}
