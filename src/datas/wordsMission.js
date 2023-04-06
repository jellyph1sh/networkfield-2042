const WordsLevel = {
  lvl1: [
    "ls",
    "pwd",
    "cd",
    "rm",
    "cmd",
    "del",
    "echo",
    "exit",
    "find",
    "getmac",
    "help",
    "ipconfig",
    "md",
    "mkdir",
    "move",
    "netstat",
    "PATH",
    "ping",
    "prompt",
    "run",
    "change",
    "create",
    "delete",
    "end",
    "query",
    "set",
    "shutdown",
    "start",
    "telnet",
    "timeout",
    "tree",
    "xcopy",
    "arp",
    "break",
    "chgport",
    "extract",
    "for",
    "ftp",
    "label",
    "lock",
    "net",
    "nslookup",
    "pause",
    "print",
    "reset",
    "type",
    "scan",
    "grep",
  ],
  lvl2: [
    "ls -l",
    "ls -a",
    "cat mdp.txt",
    "cat data.csv",
    "cd files",
    "cd secretdata",
    "cd ..",
    "rm -rf datafolder",
    "rm -rf secretdata",
    "del data.csv",
    "del secretdata.csv",
    "cp mdp.txt",
    "echo 'hello'",
    "find 'secret'",
    "find 'mdp'",
    "find 'private'",
    "md 'malware'",
    "copy mdp.txt",
    "copy data.vsc",
    "copy secretdata.csv",
    "ping localhost",
    "run malware.exe",
    "run script.sh",
    "shutdown lochalhost",
    "telnet google.com",
    "timeout /t 100",
    "tree \\",
    "arp -a",
    "net accounts",
    "nslookup google.com",
    "random-access memory",
  ],
  lvl3: [
    "sort -o secret_mdp_sort.txt secret_mdp.txt",
    "tar -cvf copy_data.tar secret_folder",
    "tar -cvf copy_compromising_folder.tar compromising_folder",
    "grep secret /secret/compromising/*",
    "grep 'ip' /etc/apache2/conf.d/*",
    "grep -E 'ERROR|CRITICAL' /opt/tomcat/log/*.log",
    "find /secret_directory -type f -mtime -24",
    "ssh -D 2013 admin@10.44.08.19",
    "ip addr add 192.168.0.7 dev eth0",
    "ip addr del 192.168.0.7 dev eth0",
    "sudo add-apt-repository ppa:kirillshkrogalev/ffmpeg-next",
    "ls -lh /etc|grep ^d",
    "ls -lr /etc/ --group-directories-first",
    "chmod -c 777 /home/user/malware.exe",
    "net user elon_kiosk 83}Uxa2iM^(6Rf /delete",
    "net user jeff_pesos iG4y2*_wy:WG23 /delete",
    "net user donald_trunk v44=GZ9qiS)}5m /delete",
  ],
  lvl4: [],
};

const getWords = (level, nbWords) => {
  const words = WordsLevel["lvl" + level];
  if (words.length <= nbWords) {
    return words;
  }
  const wordsIndex = getRandomIndex(nbWords);
  const result = [];
  wordsIndex.forEach((i) => {
    result.push(words[i]);
  });
  return result;
};

const getRandomIndex = (nbIndex) => {
  const result = [];
  while (result.length < nbIndex) {
    const index = Math.floor(Math.random() * nbIndex);
    if (!result.includes(index)) {
      result.push(index);
    }
  }
  return result;
};
