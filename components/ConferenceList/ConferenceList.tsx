'use client'

import React, {ReactNode, Ref, forwardRef } from 'react'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import clsx from 'clsx'
import Typography from '@mui/material/Typography';

type ConferenceDetails = {
    title?: string
    link?: {
        href: string
        target?: "_blank" | "_self"
    }
    location?: string
    locationStyle: string
    start_date?: string
    end_date?: string
    dateStyle: string
    talks: string[]
}

type Props = {
    className?: string
    items: ConferenceDetails[]
}

export const ConferenceList = forwardRef(function ConferenceList(
    { className, items }: Props,
    ref: Ref<HTMLDivElement>
) {
    console.log(items)
    const getFormattedDate = (start_date?: string, end_date?: string) => {
        if (!start_date)
            return ''

        if (end_date)
            return `  ${start_date} - ${end_date}`
        else
            return `  ${start_date}`
    }
    return (
        <div className={className}
            ref={ref}
            style={{}}
        >
            {items.length > 0 ? (
                <List sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                    {items?.map((item, index) => (
                        <ListItemText
                            key={"item" + index}
                            primary={
                                <React.Fragment>
                                    <div className={className}>
                                        { item.link?.href?.includes('://') ? 
                                            <a href={item.link.href}>{item.title}</a> :
                                            <span>{item.title}</span>
                                        }
                                        <Typography
                                            className={item.locationStyle}
                                            component={'span'}>
                                                {item?.location}
                                        </Typography>
                                        <Typography
                                            className={item.dateStyle}
                                            component={'span'}>
                                                {getFormattedDate(item?.start_date, item?.end_date)}
                                        </Typography>
                                    </div>
                                </React.Fragment>}
                            secondary={item.talks && item.talks.length > 0 ? (
                                <span className="flex flex-col">
                                    {
                                        item.talks.map((talk, index) => (
                                            <span key={"talk" + index}>{talk}</span>
                                        ))
                                    }
                                </span>
                            ) : ('No talks')}
                        />
                    ))}
                </List>
            ) : (
                <div className={className}>
                    There are no items. Try adding some.
                </div>
            )}
        </div>
    )
})

export default ConferenceList