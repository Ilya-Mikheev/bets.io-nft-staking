import Airdrop from "@/components/Airdrop";
import Header from "@/components/Header";
import Nft from "@/components/Nft";
import { useUmi } from "@/utils/useUmi";
import { useToast } from "@chakra-ui/react";
import { AccountVersion, CandyGuard, CandyMachine, fetchCandyMachine, safeFetchCandyGuard } from "@metaplex-foundation/mpl-candy-machine";
import { PublicKey, publicKey, Umi } from "@metaplex-foundation/umi";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

const useCandyMachine = (
  umi: Umi,
  candyMachineId: string,
  checkEligibility: boolean,
  setCheckEligibility: Dispatch<SetStateAction<boolean>>,
  firstRun: boolean,
  setFirstRun: Dispatch<SetStateAction<boolean>>
) => {
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();
  const [candyGuard, setCandyGuard] = useState<CandyGuard>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      if (checkEligibility) {
        if (!candyMachineId) {
          console.error("No candy machine in .env!");
          if (!toast.isActive("no-cm")) {
            toast({
              id: "no-cm",
              title: "No candy machine in .env!",
              description: "Add your candy machine address to the .env file!",
              status: "error",
              duration: 999999,
              isClosable: true,
            });
          }
          return;
        }

        let candyMachine;
        try {
          candyMachine = await fetchCandyMachine(umi, publicKey(candyMachineId));
          // Verify CM Version
          if (candyMachine.version !== AccountVersion.V2) {
            toast({
              id: "wrong-account-version",
              title: "Wrong candy machine account version!",
              description: "Please use the latest sugar to create your candy machine. Need Account Version 2!",
              status: "error",
              duration: 999999,
              isClosable: true,
            });
            return;
          }
        } catch (e) {
          console.error(e);
          toast({
            id: "no-cm-found",
            title: "The CM from .env is invalid",
            description: "Are you using the correct environment?",
            status: "error",
            duration: 999999,
            isClosable: true,
          });
          
        }
        setCandyMachine(candyMachine);
        setIsLoading(false);
        if (!candyMachine) {
          return;
        }
        let candyGuard;
        try {
          candyGuard = await safeFetchCandyGuard(umi, candyMachine.mintAuthority);
        } catch (e) {
          console.error(e);
          toast({
            id: "no-guard-found",
            title: "No Candy Guard found!",
            description: "Do you have one assigned?",
            status: "error",
            duration: 999999,
            isClosable: true,
          });
        }
        if (!candyGuard) {
          return;
        }
        setCandyGuard(candyGuard);
        if (firstRun) {
          setFirstRun(false);
        }
      }
    })();
  }, [umi, checkEligibility]);

  return { candyMachine, candyGuard, isLoading };
};

export default function Home() {
  const umi = useUmi();
  const toast = useToast();
  const [firstRun, setFirstRun] = useState(true);
  const [checkEligibility, setCheckEligibility] = useState<boolean>(true);

  if (!process.env.NEXT_PUBLIC_CANDY_MACHINE_ID) {
    console.error("No candy machine in .env!");
    if (!toast.isActive('no-cm')) {
      toast({
        id: 'no-cm',
        title: 'No candy machine in .env!',
        description: "Add your candy machine address to the .env file!",
        status: 'error',
        duration: 999999,
        isClosable: true,
      });
    }
  }
  const candyMachineId: PublicKey = useMemo(() => {
    if (process.env.NEXT_PUBLIC_CANDY_MACHINE_ID) {
      return publicKey(process.env.NEXT_PUBLIC_CANDY_MACHINE_ID);
    } else {
      console.error("NO CANDY MACHINE IN .env FILE DEFINED!");
      toast({
        id: 'no-cm',
        title: 'No candy machine in .env!',
        description: "Add your candy machine address to the .env file!",
        status: 'error',
        duration: 999999,
        isClosable: true,
      });
      return publicKey("11111111111111111111111111111111");
    }
  }, []);

  const { candyMachine, isLoading } = useCandyMachine(umi, candyMachineId, checkEligibility, setCheckEligibility, firstRun, setFirstRun);

  return (
    <>
      <Header />
      <Nft items={candyMachine?.items} isLoading={isLoading} />
      <Airdrop />
    </>
  )
}