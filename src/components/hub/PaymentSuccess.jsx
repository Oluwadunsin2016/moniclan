/* eslint-disable react/prop-types */

// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, Card, CardFooter, CardHeader } from '@nextui-org/react';

const PaymentSuccess = ({onClose}) => {

  return (
      <div className="">
        <Card className="shadow-lg border-green-100">
          <CardHeader className="bg-green-50 border-b border-green-100">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h1 className="text-center text-2xl text-green-700">Payment Successful!</h1>
          </CardHeader>
          <div className="pt-6">
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Thank you for your purchase. We&apos;ve sent a confirmation email with all the details.
              </p>
              <div className="p-4 bg-gray-50 rounded-md">
                <div className="text-sm text-gray-500">Order Reference</div>
                <div className="font-mono font-medium">ORD-{Math.random().toString(36).substring(2, 10).toUpperCase()}</div>
              </div>
            </div>
          </div>
          <CardFooter>
            <Button
              onPress={onClose} 
              className="w-full bg-stripe-blue hover:bg-stripe-light-blue"
            >
              Return to Bill Easy
            </Button>
          </CardFooter>
        </Card>
      </div>
  );
};

export default PaymentSuccess;
