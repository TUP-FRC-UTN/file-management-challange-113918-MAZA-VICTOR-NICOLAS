import { Component, OnInit } from '@angular/core';
import { FILE_LIST, OWNERS } from '../../data/file.storage';
import { FileItem, FileOwner, FileType } from '../../models/file.item.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent implements OnInit {



  files: FileItem[] = FILE_LIST;
  title = 'file-management';
  indicesPorBorrar: number[] = [];
  formuActive: boolean = false;
  FileType = FileType;
  selectedOwner: FileOwner | null = null;
owners = OWNERS;

  newFile: FileItem = {
    id: '1',
    name: '',
    creation: new Date(),
    type: FileType.FILE,
    owners: [OWNERS[0], OWNERS[2]],
  }

  addOwner() {
    if (this.selectedOwner && !this.newFile.owners.includes(this.selectedOwner)) {
      this.newFile.owners.push(this.selectedOwner);
      this.selectedOwner = null; 
    }
  }
  removeOwner(index: number) {
    this.newFile.owners.splice(index, 1);
  }

  sendform(form: NgForm) {
    if (form.valid) {
      console.log("SE ENVIA ESTO:", this.newFile);
    }
  }
  ngOnInit(): void {
    this.files.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === FileType.FOLDER ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
    console.log(this.files)
  }

  chcked(index: number, event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.indicesPorBorrar.push(index)
      console.log(this.indicesPorBorrar)
    } else {
      const indexporborrar = this.indicesPorBorrar.indexOf(index);
      this.indicesPorBorrar.splice(indexporborrar, 1)
      console.log(this.indicesPorBorrar)
    }

  }

  borrar() {
    if (this.indicesPorBorrar.length > 1) {
      const confirmacion = confirm("Está a punto de borrar más de un archivo. ¿Desea continuar?");


      if (confirmacion) {

        this.indicesPorBorrar.sort((a, b) => b - a).forEach(index => {
          console.log("Antes de borrar", this.files);
          this.files.splice(index, 1);
        });
        this.indicesPorBorrar = [];
      }

    } else if (this.indicesPorBorrar.length === 1) {

      const index = this.indicesPorBorrar[0];
      console.log("Antes de borrar", this.files);
      this.files.splice(index, 1);
      this.indicesPorBorrar = [];
    }


  }
  nuevo() {
    this.formuActive = !this.formuActive
  }


}
