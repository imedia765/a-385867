import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info } from "lucide-react";

const MembershipInformation = () => {
  return (
    <Dialog>
      <DialogTrigger className="text-dashboard-accent1 hover:text-dashboard-accent2 transition-colors inline-flex items-center gap-2">
        <Info className="w-4 h-4" />
        <span>View Membership Information</span>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">Pakistan Welfare Association - Membership Information</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-dashboard-text">
            <div className="text-center mb-6">
              <p className="font-semibold">Pakistan Welfare Association</p>
              <p>Burton Upon Trent</p>
              <p>December 2024</p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white">1. Members Eligibility</h3>
                <p>Only Muslims can be members of Pakistan Welfare Association (PWA).</p>
              </div>

              <div>
                <h3 className="font-semibold text-white">2. Membership Fee</h3>
                <p>Any new members must pay a membership fee plus the collection amount for that calendar year. Currently the membership fee is £150 as of January 2024. This may change with inflation and is reviewed periodically to reflect the costs incurred.</p>
              </div>

              <div>
                <h3 className="font-semibold text-white">3. Dependents Registration</h3>
                <p>All members will be given a membership number and will need to register their dependents so that the PWA Committee can gain an accurate picture of the actual number of people covered. Dependents include stepchildren and adopted children.</p>
              </div>

              <div>
                <h3 className="font-semibold text-white">4. Health Declaration</h3>
                <p>New members must be in good health, with no known terminal illnesses. Any long-term illnesses must be disclosed to the Committee for consideration during the membership process.</p>
              </div>

              <div>
                <h3 className="font-semibold text-white">5. Confidentiality</h3>
                <p>All data is confidentially stored under GDPR rules and will not be shared except for necessary processes when death occurs or for use within PWA.</p>
              </div>

              <div>
                <h3 className="font-semibold text-white">6. Payment Terms</h3>
                <p>Payments will need to be made within 28 days from collection date. This will take place annually from 1st January and no later than 29th January. Any non-paying members will have a warning, and have seven days to make payment which is up until 5th February, in this seven day period they are not covered as members and nor are their dependents.</p>
              </div>

              {/* Continue with all other sections... */}
              <div>
                <h3 className="font-semibold text-white">7. Non-payment Consequences</h3>
                <p>Any further nonpayment will result in cancellation of membership, and will have to re-register as a member, and must pay a new membership fee of £150. All costs are reviewed periodically to reflect inflation, changes will be communicated to members via their Collector Members or directly through a communication mechanism.</p>
              </div>

              <div>
                <h3 className="font-semibold text-white">8-11. Registration Requirements</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Every married man will need to ensure they are registered separately from their parents or guardian.</li>
                  <li>Every young male over the age of 18 must have membership in the association regardless to the fact they are employed/unemployed or disabled except for being in full time education until their 22nd birthday.</li>
                  <li>No membership charges will apply to migrating members up until their 23rd birthday, where a new membership charge is applicable. Apprenticeships do not count as being in education.</li>
                  <li>As and when a members child leaves full time education, they must also register as an individual member.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white">12-16. Special Cases</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Unmarried females are covered under their parents' membership until marriage.</li>
                  <li>In case of separation or divorce, both parties must have separate memberships.</li>
                  <li>Widowed ladies must maintain regular fee payments as head of family.</li>
                  <li>Additional wives require separate membership registration.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white">17-18. Assistance Offered</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>£500 payment to widow/orphans (under 18) upon death of head member (£1,000 if death occurs in Pakistan).</li>
                  <li>Coverage for both viable and non-viable foetus.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white">19-21. Residency Requirements</h3>
                <p>Members must be residents of East Staffordshire Borough Council (ESBC). Proof of residency may be required. Special conditions apply for legacy members (pre-2024) who move out of ESBC.</p>
              </div>

              <div>
                <h3 className="font-semibold text-white">22. Visitor Membership</h3>
                <p>Visitors can apply for temporary membership at £50 plus last collection (non-refundable).</p>
              </div>

              <div>
                <h3 className="font-semibold text-white">23-24. Repatriation Costs</h3>
                <p>Maximum repatriation costs are based on average of last 4 UK burials. Specific conditions apply for both foreign and UK repatriation.</p>
              </div>

              <div>
                <h3 className="font-semibold text-white">25. Financial Buffer</h3>
                <p>A minimum buffer of £16,000 (cost of 4 deaths) must be maintained in the PWA bank account.</p>
              </div>

              <div>
                <h3 className="font-semibold text-white">26-27. Additional Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Extra funeral arrangement costs are the family's responsibility.</li>
                  <li>Committee must vote on payment and rule changes.</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10">
              <p className="italic">By becoming a member of the Pakistan Welfare Association, you agree to abide by these terms and conditions outlined above.</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipInformation;