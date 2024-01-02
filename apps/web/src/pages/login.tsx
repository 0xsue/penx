import { Suspense, useMemo } from 'react'
import { Box } from '@fower/react'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { NEXTAUTH_PROVIDERS } from '@penx/constants'
import LoginWithGithubButton from '~/components/LoginWithGithubButton'
import LoginWithGoogleButton from '~/components/LoginWithGoogleButton'
import { Logo } from '~/components/Logo'
import { authOptions } from './api/auth/[...nextauth]'

export default function LoginPage() {
  const providers = useMemo(() => {
    if (!NEXTAUTH_PROVIDERS) return []
    return (NEXTAUTH_PROVIDERS || '').split(',')
  }, [])

  const showGoogle = providers.includes('GOOGLE')
  const showGitHub = providers.includes('GITHUB')

  return (
    <Box column h-100vh>
      <Box mx-auto py8 toCenter>
        <Logo />
      </Box>
      <Box column flex-1 toCenter>
        <Box
          toCenter
          py10
          roundedXL
          mx-auto
          bgWhite
          column
          mt--200
          w={['100%', '100%', 480]}
        >
          <Box as="h1" fontBold>
            Welcome to PenX
          </Box>
          <Box as="p" textCenter mb6 leadingNormal px10 gray500>
            A structured note-taking app for personal use
          </Box>
          <Box column gap4>
            {showGitHub && (
              <Suspense fallback={<Box my2 h10 w-100p border borderStone200 />}>
                <LoginWithGithubButton />
              </Suspense>
            )}
            {showGoogle && (
              <Suspense fallback={<Box my2 h10 w-100p border borderStone200 />}>
                <LoginWithGoogleButton />
              </Suspense>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async function (context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session) {
    return {
      redirect: {
        destination: '/editor',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
