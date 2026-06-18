import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import { signUpAction } from '../actions/auth'

export default function Page() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Enter the credentials you would like to use for your new account.
          </CardDescription>
          <CardAction>
            <Button variant="link">
              <Link href="/login">Login</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form id="signup" action={signUpAction}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="johndoe@example.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input id="username" name="username" placeholder="JohnDoe42" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" name="password" type="password" required />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="signup" className="w-full">
            Sign Up
          </Button>
          {/* Future social logins go here */}
        </CardFooter>
      </Card>
    </div>
  )
}
