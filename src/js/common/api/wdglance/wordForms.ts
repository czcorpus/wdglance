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

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataApi, IAsyncKeyValueStore } from '../../types';
import { HTTP } from 'cnc-tskit';
import { cachedAjax$ } from '../../ajax';
import { QueryMatch } from '../../query';
import { RequestArgs, Response } from '../../api/abstract/wordForms';
import { HTTPAction } from '../../../server/routes/actions';


export interface HTTPResponse {
    result:Array<QueryMatch>;
}


export class WordFormsWdglanceAPI implements DataApi<RequestArgs, Response> {

    apiUrl:string;

    cache:IAsyncKeyValueStore;

    constructor(cache:IAsyncKeyValueStore, url:string) {
        this.cache = cache;
        this.apiUrl = url;
    }

    call(args:RequestArgs):Observable<Response> {
        return cachedAjax$<HTTPResponse>(this.cache)(
            HTTP.Method.GET,
            this.apiUrl + HTTPAction.WORD_FORMS,
            args

        ).pipe(
            map(
                (item) => {
                    const total = item.result.reduce((acc, curr) => curr.abs + acc, 0);
                    return {
                        forms: item.result.map(v => ({
                            value: v.word,
                            freq: v.abs,
                            ratio: v.abs / total
                        }))
                    };
                }
            )
        );
    }

}