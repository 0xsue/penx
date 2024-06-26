'use client'

import { PropsWithChildren, useEffect } from 'react'
import { Box } from '@fower/react'
import { isServer, useQuery } from '@tanstack/react-query'
import Head from 'next/head'
import { EditorApp } from '@penx/app'
import { appEmitter } from '@penx/event'
import { SessionProvider, useSession } from '@penx/session'
import { getLocalSession } from '@penx/storage'
import {
  FirstLocalSpaceGenerator,
  RecoveryPhraseLoginProvider,
} from '@penx/widget'
import { installBuiltinExtension } from '~/common/installBuiltinExtension'
import { CmdkRoot } from '~/components/CmdkRoot'
import { DesktopWelcome } from '~/components/DesktopWelcome'

export default function Home() {
  const {
    isLoading,
    data: isBoarded,
    refetch,
  } = useQuery(['isFistTime'], async () => {
    const isBoarded = localStorage.getItem('PENX_IS_BOARDED')
    return !!isBoarded
  })

  if (isLoading) return null
  return (
    <>
      <Head>
        <title>PenX</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        relative
        absolute
        top0
        bottom0
        left0
        right0
        rounded2XL
        bgTransparent
        overflowHidden
      >
        {!isBoarded && (
          <DesktopWelcome
            isLoading={isLoading}
            onGetStarted={async () => {
              localStorage.setItem('PENX_IS_BOARDED', 'yes')
              await installBuiltinExtension()
              refetch()
            }}
          />
        )}
        {isBoarded && <CmdkRoot />}
      </Box>
    </>
  )
}
