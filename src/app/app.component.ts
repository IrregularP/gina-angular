import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ToDoApp';
  
  readonly APIUrl= "https://gina-todo-api.onrender.com/api/todoapp/"

  constructor(private http:HttpClient) { 

  }
  notes: any=[];

  refreshNotes(){
    this.http.get(this.APIUrl+'getNotes').subscribe(data=>{
      this.notes=data;
    })
  }

  ngOnInit(){
    this.refreshNotes();
  }

  addNotes(){
    var newNotes = (<HTMLInputElement>document.getElementById("newNotes")).value;
    var formData= new FormData();
    formData.append("newNotes", newNotes);
    this.http.post(this.APIUrl+ 'AddNotes', formData).subscribe(data=>{
      alert(data);
      this.refreshNotes();
    })
  }

  deleteNotes(id:any){
    this.http.delete(this.APIUrl+'DeleteNotes?id='+id).subscribe(data=>{
      alert(data);
      this.refreshNotes();
    })
  }
}
