import React, {
  FC,
  useCallback,
  useState,
  useReducer,
  useEffect,
  Fragment,
} from 'react'
import {
  Container,
  Typography,
  Button,
  TextField,
  Fade,
} from '@material-ui/core'
import {
  Link,
  NavBar,
  PageTitle,
  ProfileCell,
  Spacer,
} from '@app/components/general'
import { Box } from '@a11ywatch/ui'
import { TextSkeleton } from '@app/components/placeholders'
import { AppManager } from '@app/managers'
import { useUserData } from '@app/data'
import { metaSetter } from '@app/utils'
import { useProfileStyles as useStyles } from '@app/styles/pages/profile'
import type { PageProps } from '@app/types'
import { useBillingDisplay } from '@app/data/formatters'

interface PasswordState {
  newPassword?: string
  currentPassword?: string
  changePassword: boolean // display the change password form
}

const initialPasswordState: PasswordState = {
  newPassword: '',
  currentPassword: '',
  changePassword: false,
}

interface PasswordAction {
  payload?: string
  type: 'toggleVisiblility' | 'mutateCurrent' | 'mutateNew' | 'reset'
}

type PasswordReducer = (
  state: PasswordState,
  action: PasswordAction
) => PasswordState

const passwordReducer: PasswordReducer = (state, action) => {
  const { payload } = action
  switch (action.type) {
    case 'toggleVisiblility': {
      return { ...state, changePassword: !state.changePassword }
    }
    case 'mutateCurrent': {
      return { ...state, currentPassword: payload }
    }
    case 'mutateNew': {
      return { ...state, newPassword: payload }
    }
    case 'reset': {
      return { ...initialPasswordState }
    }
    default: {
      return state
    }
  }
}

// url to manage billing page
const MANAGE_BILLING = process.env.NEXT_PUBLIC_MANAGE_BILLING_URL

const Profile: FC<PageProps> = ({ name }) => {
  const classes = useStyles()
  const { data = {}, loading, updateUser, updateUserData } = useUserData(
    true,
    'profile'
  )

  const [
    { changePassword, currentPassword, newPassword },
    dispatch,
  ] = useReducer(passwordReducer, Object.assign({}, initialPasswordState))

  // todo: reducer
  const [changeEmail, setChangeEmail] = useState<boolean>(false)
  const [newEmail, setNewEmail] = useState<string>('')

  const { user } = data
  const { invoice } = user ?? {}

  const { billingtitle, billingHeadDisplay } = useBillingDisplay(invoice)

  const onChangeCurrent = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'mutateCurrent', payload: e.target.value })
    },
    [dispatch]
  )

  const onChangeNew = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'mutateNew', payload: e.target.value })
    },
    [dispatch]
  )

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewEmail(e.target.value)
    },
    [setNewEmail]
  )

  const updatePassword = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      await updateUser({
        variables: {
          password: currentPassword,
          newPassword,
        },
      }).catch((e) => {
        console.error(e)
      })
    },
    [updateUser, currentPassword, newPassword]
  )

  const updateEmail = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      await updateUser({
        variables: {
          email: newEmail,
        },
      }).catch((e) => {
        console.error(e)
      })
    },
    [updateUser, newEmail]
  )

  const togglePassword = useCallback(() => {
    dispatch({ type: 'toggleVisiblility' })
  }, [dispatch])

  const toggleEmail = useCallback(() => {
    setChangeEmail((p) => !p)
  }, [setChangeEmail])

  useEffect(() => {
    if (updateUserData?.updateUser?.success) {
      AppManager.toggleSnack(
        true,
        updateUserData?.updateUser?.message,
        'success'
      )

      dispatch({ type: 'reset' })

      setNewEmail('')
      setChangeEmail(false)
    }
  }, [updateUserData, dispatch, setNewEmail, setChangeEmail])

  const email = updateUserData?.updateUser?.user?.email ?? user?.email

  return (
    <Fragment>
      {user?.passwordRequired ? (
        <Container
          style={{ paddingTop: 12, paddingBottom: 12, textAlign: 'center' }}
        >
          <Typography>
            Password reset required. Please change your password now
          </Typography>
        </Container>
      ) : null}
      <NavBar backButton title={name} notitle />
      <Container maxWidth='xl'>
        <PageTitle title={'Your Profile'} />
        <Box className='space-y-3 py-4'>
          <div className='border-b pb-4'>
            <ProfileCell
              title={'Email'}
              skeletonLoad={!user && loading}
              subTitle={email}
              className={classes.email}
            />
            <ProfileCell
              title={'Account Type'}
              skeletonLoad={!user && loading}
              subTitle={
                !user?.role ? 'Free' : user?.role === 1 ? 'Basic' : 'Premium'
              }
              className={classes.email}
            />
            <ProfileCell
              title={'Active Subscription'}
              skeletonLoad={!user && loading}
              subTitle={user?.activeSubscription ? 'Yes' : 'No'}
              className={classes.email}
            />
            <ProfileCell
              title={'Alerts Enabled'}
              skeletonLoad={!user && loading}
              subTitle={user?.alertEnabled ? 'Yes' : 'No'}
              className={classes.email}
            />
            <ProfileCell
              title={'Uptime Used'}
              skeletonLoad={!user && loading}
              subTitle={`${(user?.scanInfo?.totalUptime
                ? Number(user.scanInfo.totalUptime) / 1000
                : 0
              ).toFixed(0)}s`}
              className={classes.email}
            />
            {user?.activeSubscription ? (
              <ProfileCell
                title={billingHeadDisplay}
                skeletonLoad={!user && loading}
                subTitle={billingtitle}
                className={classes.email}
              />
            ) : null}

            <div className='space-y-2 w-[250px] py-4'>
              {!user && loading ? (
                <TextSkeleton width='8%' />
              ) : (
                <>
                  {changePassword ? (
                    <div className={classes.row}>
                      <Fade in={changePassword}>
                        <form
                          onSubmit={updatePassword}
                          noValidate
                          className={`flex flex-col p-2 bg-gray-100 border rounded`}
                        >
                          <TextField
                            autoFocus
                            onChange={onChangeCurrent}
                            color='secondary'
                            inputProps={{
                              minLength: 6,
                              pattern: 'password',
                            }}
                            autoComplete='current-password'
                            value={currentPassword}
                            id='current_password'
                            placeholder='Current Password'
                            type='password'
                            required
                          />
                          <TextField
                            onChange={onChangeNew}
                            color='secondary'
                            inputProps={{
                              minLength: 6,
                              pattern: 'password',
                            }}
                            autoComplete='new-password'
                            value={newPassword}
                            id='new_password'
                            placeholder='New Password'
                            type='password'
                            required
                          />
                          <Spacer />
                          <div className='flex space-x-2'>
                            <Button
                              onClick={togglePassword}
                              className={classes.submit}
                              type='button'
                            >
                              Cancel
                            </Button>

                            <Button
                              onClick={updatePassword}
                              className={classes.submit}
                              type='submit'
                              variant='outlined'
                            >
                              Submit
                            </Button>
                          </div>
                        </form>
                      </Fade>
                    </div>
                  ) : null}
                  {changeEmail ? (
                    <div className={classes.row}>
                      <Fade in={changeEmail}>
                        <form
                          onSubmit={updateEmail}
                          noValidate
                          className={`flex flex-col p-2 bg-gray-100 border rounded`}
                        >
                          <TextField
                            autoFocus
                            onChange={onChangeEmail}
                            color='secondary'
                            inputProps={{
                              minLength: 6,
                              pattern: 'email',
                            }}
                            autoComplete='current-email'
                            value={newEmail}
                            id='email'
                            placeholder='New Email'
                            type='email'
                            required
                          />
                          <Spacer />
                          <div className='flex space-x-2'>
                            <Button
                              onClick={toggleEmail}
                              className={classes.submit}
                              type='button'
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={updateEmail}
                              className={classes.submit}
                              type='submit'
                              variant='outlined'
                            >
                              Submit
                            </Button>
                          </div>
                        </form>
                      </Fade>
                    </div>
                  ) : null}
                </>
              )}
              <>
                {!changePassword ? (
                  <Button
                    onClick={togglePassword}
                    className={classes.submit}
                    type='button'
                    variant='outlined'
                  >
                    Change Password
                  </Button>
                ) : null}
                {!changeEmail ? (
                  <Button
                    onClick={toggleEmail}
                    className={classes.submit}
                    type='button'
                    variant='outlined'
                  >
                    Change Email
                  </Button>
                ) : null}
              </>
            </div>
          </div>
          <div className='py-5 space-y-10'>
            {user?.activeSubscription ? (
              <div>
                <Link
                  href={`${MANAGE_BILLING}?prefilled_email=${encodeURIComponent(
                    email
                  )}`}
                  rel='noreferrer'
                  target='_blank'
                  className={`text-lg font-bold inline-block rounded hover:bg-[#0E1116] hover:text-white px-10 py-4 bg-white text-black outline`}
                >
                  Manage Billing
                </Link>
              </div>
            ) : null}
            <div>
              <Link
                href='/payments'
                className={`text-lg font-bold inline-block rounded hover:bg-[#0E1116] hover:text-white px-10 py-4 bg-white text-black outline`}
              >
                {user?.activeSubscription ? 'Upgrade / Downgrade' : 'Upgrade'}
              </Link>
            </div>
          </div>
        </Box>
      </Container>
    </Fragment>
  )
}

export default metaSetter(
  { Profile },
  {
    gql: true,
  }
)
