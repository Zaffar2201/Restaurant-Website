<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns="http://www.w3.org/1999/xhtml"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes"
doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN" />
    <xsl:template match="/menu">
    	<xsl:variable name="apostrophe">"</xsl:variable>
        <html>
        	<head>
        		<title>Odurelle | Menu</title>
	            <link rel="stylesheet" type="text/css" href="css/menu.css"/>
	            <link rel="stylesheet" type="text/css" href="css/index.css"/>
	            <link rel="stylesheet" type="text/css" href="css/font.css"/>
        	</head>
            
            <body>
        	<div class="page" id="page">
        		
        		<div id="mainTitle" class="header">Odurelle</div>
    			<div id = "left" class="moveElement">
				  	<xsl:for-each select="section">
		        		<div class="section">
		        			<img class="sectionImage" src="res/{mainImage}.jpg"/>
		        			<div class = "sectionBottom">
								<div class="sectionTitle"><xsl:value-of select="title"/></div>
								<div class="sectionDescription"><xsl:value-of select="description"/></div>
							</div>
							<div img="{image}"></div>
							<div class="sectionSubs">
								<xsl:for-each select="subSection/sub">
									<div class="sectionSub">
										<div class="sectionSubTitle"><xsl:value-of select="subTitle"/></div>			
										<div class="sectionDescription"><xsl:value-of select="subDesctiption"/></div>
										<div class="sectionPrice"><xsl:value-of select="price"/></div>
									</div>
								</xsl:for-each>
							</div>
					</div>
		        	</xsl:for-each>
	        	</div>

	        	<div id="right" class="moveElement">
	        		<div id="rightBody">
		        		<img id="rightImage" src="res/pizza.jpg"/>

		        		<div id="rightLeft">
		        			<div id="rightTitle">Pizza</div>
		        			<div id="rightCaroussel">
		        				<div class="rightCarousselImageContainer container1">
		        					<img id="rightImage1" class="rightCarousselImage" src=""/>
		        					<div id="rightDescription1" class="rightCarousselImageDescription"></div>
		        				</div>
		        				<div class="rightCarousselImageContainer conatainer2">
		        					<img id="rightImage2" class="rightCarousselImage" src=""/>
		        					<div id="rightDescription2" class="rightCarousselImageDescription"></div>
		        				</div>
		        			</div>
		        		</div> 
		        		
		        		<div id="rightContent"></div>
		        	</div>
	        	</div>


	        		
			</div>
			<div id="loading"></div>
        	<div class="carousselIndicator" id="carousselIndicator">
        		<div class="carousselIndicatorItem tooltip" id="carousselIndicatorItem-1">
        			<span class="tooltiptext">Home</span>
        		</div>
        		<div class="carousselIndicatorItem tooltip" id="carousselIndicatorItem-2">
        			<span class="tooltiptext">Goal</span>
        		</div>
        		<div class="carousselIndicatorItem tooltip" id="carousselIndicatorItem-3">
        			<span class="tooltiptext">Contact Details</span>
        		</div>
        		<div class="carousselIndicatorItem tooltip active" id="carousselIndicatorItem-4">
        			<span class="tooltiptext">Menu</span>
        		</div>
        	</div>
        	<script type="text/javascript" src="js/jQuery.js"></script>
        	<script type="text/javascript" src="js/menu.js"></script>
        </body>
        </html>
        
    </xsl:template>
</xsl:stylesheet>