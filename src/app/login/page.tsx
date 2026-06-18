import Form from 'next/form'
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

import { signInAction } from '../actions/auth'

export default function Page() {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your email and password below.</CardDescription>
          <CardAction>
            <Button variant="link">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Form id="login" action={signInAction}>
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" name="password" type="password" required />
              </Field>
            </FieldGroup>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" form="login" className="w-full">
            Login
          </Button>
          {/* Future social logins go here */}
        </CardFooter>
      </Card>
    </div>
  )
}
