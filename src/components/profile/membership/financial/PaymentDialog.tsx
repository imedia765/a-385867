import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/formatters";
import { Member } from "@/types/member";
import { useToast } from "@/hooks/use-toast";

interface PaymentDialogProps {
  memberProfile: Member;
}

const PaymentDialog = ({ memberProfile }: PaymentDialogProps) => {
  const [paymentType, setPaymentType] = useState<'yearly' | 'emergency'>('yearly');
  const [amount, setAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'cash'>('bank');
  const { toast } = useToast();

  const handlePayment = () => {
    // Here you would integrate with your payment processing system
    toast({
      title: "Payment Initiated",
      description: `${paymentType === 'yearly' ? 'Yearly' : 'Emergency'} payment of ${
        paymentType === 'yearly' 
          ? formatCurrency(memberProfile?.yearly_payment_amount || 40)
          : formatCurrency(Number(amount))
      } via ${paymentMethod}`,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="w-full">
          Make a Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-dashboard-card text-dashboard-text">
        <DialogHeader>
          <DialogTitle className="text-white">Make a Payment</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <Label className="text-white">Payment Type</Label>
            <RadioGroup
              defaultValue="yearly"
              onValueChange={(value) => setPaymentType(value as 'yearly' | 'emergency')}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yearly" id="yearly" />
                <Label htmlFor="yearly">Yearly Payment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="emergency" id="emergency" />
                <Label htmlFor="emergency">Emergency Payment</Label>
              </div>
            </RadioGroup>
          </div>

          {paymentType === 'yearly' ? (
            <div className="space-y-2">
              <Label>Amount Due</Label>
              <div className="text-lg font-medium">
                {formatCurrency(memberProfile?.yearly_payment_amount || 40)}
              </div>
              <div className="text-sm text-dashboard-muted">
                Due Date: {memberProfile?.yearly_payment_due_date || 'January 1st, 2025'}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="bg-white/5 border-white/10"
              />
            </div>
          )}

          <div className="space-y-4">
            <Label>Payment Method</Label>
            <RadioGroup
              defaultValue="bank"
              onValueChange={(value) => setPaymentMethod(value as 'bank' | 'cash')}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank">Bank Transfer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash">Cash</Label>
              </div>
            </RadioGroup>
          </div>

          <Button onClick={handlePayment} className="w-full">
            Proceed with Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;