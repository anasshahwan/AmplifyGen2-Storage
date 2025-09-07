import { Component } from '@angular/core';
import { uploadData } from 'aws-amplify/storage'; // Adjust the import path as necessary

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  selectedFile: File | null = null;
  files: any[] = [];

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }
  async uploadFile() {
    if (!this.selectedFile) {
      alert('Please select a file first!');
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    console.log('File selected:', this.selectedFile);

    const result = await uploadData({
      path: 'usersfiles/' + this.selectedFile.name,
      data: this.selectedFile,
    }).result;
    console.log(result);
  }
}
