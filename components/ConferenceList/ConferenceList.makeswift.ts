import { lazy } from 'react'

import { List, Shape, Link, Style, TextInput } from '@makeswift/runtime/controls'

import { runtime } from '@/lib/makeswift/runtime'

runtime.registerComponent(
    lazy(() => import('./ConferenceList')),
    {
        type: 'ConferenceList',
        label: 'Custom / Conference List',
        props: {
            className: Style({ properties: Style.All}),
            items: List({
                label: 'Conferences',
                type: Shape({
                    type: {
                        title: TextInput({ 
                            label: 'Title', 
                            defaultValue: 'Conference 1'
                        }),
                        link: Link({label: 'Link to conference page'}),
                        location: TextInput({
                            label: 'Location'
                        }),
                        locationStyle: Style({ properties: [Style.TextStyle, Style.Padding]}),
                        start_date: TextInput({
                            label: 'Start date'
                        }),
                        end_date: TextInput({
                            label: 'End date'
                        }),
                        dateStyle: Style({ properties: [Style.TextStyle, Style.Padding]}),
                        talks: List({
                            label: 'Talks',
                            type: TextInput({
                                label: "talk",
                                defaultValue: "talk 1"
                            }),
                            getItemLabel(item) {
                                return item as string
                            }
                        })
                    }
                }),
                getItemLabel(item) {
                    return item?.title ?? 'Conference 1'
                }
            })
        },
    }
)