import { Observable } from '@nativescript/core';
import { Http } from '@nativescript/core'
import { Translations } from './model/Translations';

export class HelloWorldModel extends Observable {
    private _counter: number;
    private _message: string;
    private _text: string;
    private _translation: string;
    private _data: Translations;
    private style: string;

    constructor() {
        super();

        this._counter = 88;
        this.getTranslations();
        this.style = 'hidden';
    }
    get text(): string { return this._text; }
    set text(value: string) { 
        this._text = value; 
        this.notifyPropertyChange('text', value);
    }
    get translation(): string { return this._translation; }
    set translation(value: string) { 
        this._translation = value; 
        this.notifyPropertyChange('translation', value);
    }
    get data(): Translations { return this._data; }
    set data(value: Translations) { 
        this._data = value; 
        this.notifyPropertyChange('data', value);
    }

    async getTranslations(){
        try {
            let url = "https://raw.githubusercontent.com/dsamsoniuk/app-course-eng/main/translations.json?t=123"
            const res:Translations = await Http.getJSON(url)
            this.data = res;
          } catch (error) {
            console.error(error);
          }
    }
    showTranslation(){
        this.notifyPropertyChange('style', '');
    }
    newText(arg){
        if (!arg.object) return;
        var trans = 'pl';
        var translations = this.data.translations
        var index = Math.floor((Math.random() * translations.length));

        if (arg.object.lang == 'pl') {
            trans = 'en';
        } else {
            trans = 'pl';
        }

        this.text = translations[index][arg.object.lang]
        this.translation = translations[index][trans]

        this.notifyPropertyChange('style', 'hidden');
    }

}
