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
import { IActionDispatcher, ViewUtils } from 'kombo';
import * as React from 'react';

import { GlobalComponents } from '../../../../views/global';
import { FreqDBRow } from '../api';
import { init as commonViewInit } from './common'


export function init(dispatcher:IActionDispatcher, ut:ViewUtils<GlobalComponents>) {

    const commonViews = commonViewInit(dispatcher, ut); // TODO duplicit stuff (see single.tsx)

    // -------------------- <MultiWordProfile /> ---------------------------------------------------

    const MultiWordProfile:React.SFC<{
        data:Array<Array<FreqDBRow>>;

    }> = (props) => {

        const srchWord = (words:Array<FreqDBRow>) => words.find(v => v.isSearched);

        return (
            <div className="MultiWordProfile">
                <table>
                    <thead>
                        <tr>
                            <th />
                            <th colSpan={2}>
                                {ut.translate('wordfreq__ipm_condensed')}
                            </th>
                            <th>{ut.translate('wordfreq__freq_bands_condensed')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map(w => srchWord(w)).map((w, i) => (
                            <React.Fragment key={`${w.lemma}:${w.pos}`}>
                                <tr>
                                    <th className="query-num">{i + 1}.</th>
                                    <td className="word">
                                        <dl className="info">
                                            <dt>{ut.translate('wordfreq_searched_form')}:</dt>
                                            <dd>{w.word}</dd>
                                            {w.pos.length > 0 ?
                                                <>
                                                    <dt>lemma:</dt>
                                                    <dd><strong>{w.lemma}</strong></dd>
                                                    <dt>{ut.translate('wordfreq__pos')}:</dt>
                                                    <dd>{w.pos.map(v => v.label).join(', ')}</dd>
                                                </> :
                                                <>
                                                    <dt>{ut.translate('wordfreq__note')}:</dt>
                                                    <dd>{ut.translate('wordfreq__not_in_dict')}</dd>
                                                </>
                                            }
                                        </dl>
                                    </td>
                                    <td className="num ipm">{ut.formatNumber(w.ipm, 2)}</td>
                                    <td style={{textAlign: 'right'}}><commonViews.Stars freqBand={w.flevel} /></td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return MultiWordProfile;

}