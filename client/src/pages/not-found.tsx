import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cream">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-wine-red" />
            <h1 className="text-2xl font-bold text-deep-brown">404 Page Not Found</h1>
          </div>

          <p className="mt-4 mb-6 text-sm text-deep-brown">
            We couldn't find the page you're looking for. Perhaps you'd like to return to our estate?
          </p>
          
          <Link href="/">
            <Button className="w-full bg-wine-red hover:bg-gold hover:text-deep-brown">
              Return to Estate de Vino
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
