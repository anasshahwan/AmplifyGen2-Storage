import { Component } from '@angular/core';
import { getUrl, list, remove, uploadData } from 'aws-amplify/storage'; // Adjust the import path as necessary

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  selectedFile: File | null = null;
  files: any[] = [];

  ngOnInit() {
    this.listAllFiles();
  }

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

  async listAllFiles() {
    const result = await list({ path: 'usersfiles/' });
    //  console.log(result);
    this.files = result.items;
    console.log(this.files);
  }

  async downloadFile(path: string) {
    console.log(path);

    const result = await getUrl({ path: path });
    console.log(result.url);

    const a = document.createElement('a');
    a.href = result.url.href;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async deleteFile(path: string) {
    console.log(path);
    const res = await remove({ path: path });
    console.log(res);
    this.listAllFiles();
  }
}
