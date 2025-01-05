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
      <DialogContent className="sm:max-w-[425px] bg-dashboard-card border-dashboard-accent1/20">
        <DialogHeader>
          <DialogTitle className="text-dashboard-accent2">Make a Payment</DialogTitle>
          <div className="space-y-1 mt-2">
            <p className="text-dashboard-accent1 text-sm">
              Member #{memberProfile?.member_number}
            </p>
            {memberProfile?.collector_id && (
              <p className="text-dashboard-text text-sm">
                Collector ID: {memberProfile.collector_id}
              </p>
            )}
          </div>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <Label className="text-dashboard-accent2">Payment Type</Label>
            <RadioGroup
              defaultValue="yearly"
              onValueChange={(value) => setPaymentType(value as 'yearly' | 'emergency')}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yearly" id="yearly" />
                <Label htmlFor="yearly" className="text-dashboard-text">Yearly Payment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="emergency" id="emergency" />
                <Label htmlFor="emergency" className="text-dashboard-text">Emergency Payment</Label>
              </div>
            </RadioGroup>
          </div>

          {paymentType === 'yearly' ? (
            <div className="space-y-2">
              <Label className="text-dashboard-accent2">Amount Due</Label>
              <div className="text-lg font-medium text-dashboard-accent1">
                {formatCurrency(memberProfile?.yearly_payment_amount || 40)}
              </div>
              <div className="text-sm text-dashboard-text">
                Due Date: {memberProfile?.yearly_payment_due_date || 'January 1st, 2025'}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-dashboard-accent2">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="bg-white/5 border-white/10 text-dashboard-text placeholder:text-dashboard-muted"
              />
            </div>
          )}

          <div className="space-y-4">
            <Label className="text-dashboard-accent2">Payment Method</Label>
            <RadioGroup
              defaultValue="bank"
              onValueChange={(value) => setPaymentMethod(value as 'bank' | 'cash')}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bank" id="bank" />
                <Label htmlFor="bank" className="text-dashboard-text">Bank Transfer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="text-dashboard-text">Cash</Label>
              </div>
            </RadioGroup>

            {paymentMethod === 'bank' && (
              <div className="mt-4 p-4 bg-white/5 rounded-lg border border-dashboard-accent1/20">
                <h4 className="text-dashboard-accent2 font-medium mb-2">Bank Details</h4>
                <div className="space-y-2 text-dashboard-text text-sm">
                  <p>HSBC Pakistan Welfare Association Burton On Trent</p>
                  <div className="flex justify-between">
                    <span>Sort Code:</span>
                    <span className="font-medium">40-15-31</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Account Number:</span>
                    <span className="font-medium">41024892</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Button onClick={handlePayment} className="w-full bg-dashboard-accent1 hover:bg-dashboard-accent1/80">
            Proceed with Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;