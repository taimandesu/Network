--TEST--
Bug #38949 (Cannot get xmlns value attribute)
--SKIPIF--
<?php require_once('skipif.inc'); ?>
--FILE--
<?php

$doc = new DOMDocument();
$doc->load(dirname(__FILE__)."/nsdoc.xml");

$root = $doc->documentElement;

echo $root->getAttribute("xmlns")."\n";
echo $root->getAttribute("xmlns:ns2")."\n";

$child = $root->firstChild->nextSibling;
echo $child->getAttribute("xmlns")."\n";
echo $child->getAttribute("xmlns:ns2")."\n";

echo "DONE\n";
?>
--EXPECT--
http://ns
http://ns2


DONE
