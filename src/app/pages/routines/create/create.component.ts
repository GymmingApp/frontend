import {Component, OnInit} from '@angular/core';
import {ExerciseService} from '../../../service/exercise.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OnLeaveForm} from '../../../interface/on-leave-form';
import {Observable} from 'rxjs';
import {UrlTree} from '@angular/router';
import {VALIDATION_PATTERNS} from '../../../util/consts';

@Component({
  selector: 'app-create',
  template: `
    <h3 class="mt-5">Crear un item de ejercicio</h3>
    <div class="mt-5">
      <form [formGroup]="form">
        <div class="input-group mb-3">
          <span class="input-group-text w-25" id="id-addon1">ID</span>
          <input type="text" class="form-control" placeholder="ID del elemento" aria-label="ID del elemento" formControlName="id"
                 aria-describedby="id-addon1" readonly>
        </div>
        <div class="input-group mb-3 has-validation">
          <span class="input-group-text w-25" id="name-addon1">Actividad</span>
          <input type="text" class="form-control" placeholder="name" aria-label="name" formControlName="name"
                 aria-describedby="name-addon1" [class.is-invalid]="isRequired('name')">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text w-25" id="series-addon1">Series</span>
          <input type="text" class="form-control" placeholder="series" aria-label="series" formControlName="series"
                 aria-describedby="series-addon1" [class.is-invalid]="isRequired('series')" [pattern]="VALIDATIONS.NUMERIC">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text w-25" id="times-addon1">Repeticiones</span>
          <input type="text" class="form-control" placeholder="times" aria-label="times" formControlName="times"
                 aria-describedby="times-addon1" [class.is-invalid]="isRequired('times')" [pattern]="VALIDATIONS.NUMERIC">
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text w-25" id="wight-addon1">Peso</span>
          <input type="text" class="form-control" placeholder="wight" aria-label="wight" formControlName="wight"
                 aria-describedby="wight-addon1" [class.is-invalid]="isRequired('wight')" [pattern]="VALIDATIONS.NUMERIC">
        </div>

        <div class="input-group">
          <span class="input-group-text w-25">Observaciones</span>
          <textarea class="form-control" aria-label="With textarea" formControlName="observations" style="resize: none"></textarea>
        </div>
        <div class="d-flex mt-3">
          <button class="btn btn-primary w-50 text-capitalize" type="button" (click)="onSubmit()" [disabled]="form.invalid">guardar</button>
          <button class="btn btn-danger w-50 text-capitalize" type="reset">limpiar</button>
        </div>
      </form>
    </div>`
})
export class CreateComponent implements OnInit, OnLeaveForm {
  public form: FormGroup;
  public VALIDATIONS = VALIDATION_PATTERNS;

  constructor(private exerciseService: ExerciseService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: null,
      name: [null, Validators.required],
      series: [null, Validators.required],
      times: [null, Validators.required],
      wight: [null, Validators.required],
      observations: null
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('saliendo', this.form.value);
      this.exerciseService.create(this.form.value).subscribe(console.log);
    } else {
      console.log(this.form.value);
    }
  }

  leaving(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.form.pristine || confirm('Ya tienes algunos datos ingresados.\n¿Deseas salir del formulario?\nLos datos ingresados se perderán.');
  }

  isRequired(path: string | string[]): boolean {
    return this.form.get(path).touched && this.form.hasError('required', path);
  }
}
