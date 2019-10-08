/*
 * Copyright 2019 Tomas Machalek <tomas.machalek@gmail.com>
 * Copyright 2019 Institute of the Czech National Corpus,
 *                Faculty of Arts, Charles University
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as Immutable from 'immutable';
import { DataApi } from '../../types';
import { TranslationsModelState, TranslationsSubsetsModelState } from '../../models/translations';


export interface WordTranslation {
    score:number;
    freq:number; // TODO probably a candidate for removal
    word:string;
    firstTranslatLc:string;
    translations:Array<string>;
    interactionId:string;
    color?:string;
}


export interface TranslationResponse {
    translations:Array<WordTranslation>;
}


export interface TranslationAPI<T, U> extends DataApi<T, TranslationResponse> {

    stateToArgs(state:TranslationsModelState<U>, query:string):T;

    stateToPageArgs(state:TranslationsModelState<U>, query:string):U;
}


export interface TranslationSubsetsAPI<T> extends DataApi<T, TranslationResponse> {

    stateToArgs(state:TranslationsSubsetsModelState, query:string, packages:Immutable.List<string>):T;
}